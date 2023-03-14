import cv2
import pytesseract
import numpy as np
from imutils.perspective import four_point_transform
import imutils
import cv2
from itertools import combinations, permutations
from mathutils.geometry import intersect_point_line


pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def transform_image(original_image):
    # Copy image and resize to fixed width.
    image = original_image.copy()
    image = imutils.resize(image, width=500)
    ratio = original_image.shape[1] / float(image.shape[1])
    height, width, _ = image.shape

    # Grayscale, blur and find edges to find receipt in image.
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5,), 0)
    edged = cv2.Canny(blurred, 75, 200)
    dilated = cv2.morphologyEx(edged, cv2.MORPH_CLOSE, np.ones((5,5),np.uint8))

    # Get contours of edges (find lines in the image)
    cnts = cv2.findContours(dilated.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cnts = imutils.grab_contours(cnts)
    cnts = sorted(cnts, key=cv2.contourArea, reverse=True)

    # Sort the contours (lines) and find the longest one.
    longest = None
    second_longest = None
    length = 0
    for c in cnts:
        peri = cv2.arcLength(c, True)
        if peri > length:
            length = peri
            longest = cv2.approxPolyDP(c, 0.02 * peri, True)

    # Remove weird excess brackets.
    longest = np.reshape(longest, (len(longest), 2))

    # Remove any verticies on the edge of the photo
    longest = longest = np.array(longest).tolist()
    dist = 10
    for vertex in longest:
        if vertex[0] < dist or vertex[0] > width - dist \
            or vertex[1] < dist or vertex[1] > height - dist:
                longest.remove(vertex)
    longest = np.array(longest)

    
    # It may have some overlapping vertices so remove those in a certain radius
    vertices = []
    for vertex in longest:
        if len(vertices) == 0:
            vertices.append(vertex)
        else:
            add = True
            for vertex2 in vertices:
                if np.linalg.norm(vertex2 - vertex) < 150:
                    add = False
                    break
            if add:
                vertices.append(vertex)
    

    # Remove any verticies which are points on a line between two points as they are redundant.
    vertices = np.array(vertices).tolist()
    for end1_a, end2_a, point_a in permutations(vertices, 3):
        end1, end2, point = np.array(end1_a, copy=True), np.array(end2_a, copy=True), np.array(point_a, copy=True)
        cosine_angle = np.dot(end1 - point, end2 - point) / (np.linalg.norm(end1 - point) * np.linalg.norm(end2 - point))
        angle = np.degrees(np.arccos(cosine_angle))
        if abs(angle) > 90.0:
            intersect = np.array(intersect_point_line(point, end1, end2)[0])
            if np.linalg.norm(intersect - point) < 25:
                if point_a in vertices:
                    vertices.remove(list(point_a))

    # If verticies cannot be found for each corner of receipt, just use corner of image
    if len(vertices) < 4:
        corners = np.array([[False, False],
                        [False, False]])
        for vertex in vertices:
            if vertex[1] <= height / 2:
                # Top half of image
                if vertex[0] <= width / 2:
                    # Top left
                    corners[0, 0] = True
                else:
                    # Top right
                    corners[1, 0] = True
            else:
                # Bottom half of image
                if vertex[0] <= width / 2:
                    # Bottom left
                    corners[0, 1] = True
                else:
                    # Bottom right
                    corners[1, 1] = True
        for i in range(2):
            for j in range(2):
                if corners[i, j] == False:
                    vertices.append([i*width, j*height])
        
    # Sorts vertexes to be clockwise
    def sort_coordinates(list_of_xy_coords):
        cx, cy = list_of_xy_coords.mean(0)
        x, y = list_of_xy_coords.T
        angles = np.arctan2(x-cx, y-cy)
        indices = np.argsort(-angles)
        return list_of_xy_coords[indices]
        
    new_verticies = np.array(vertices)
    new_verticies = sort_coordinates(new_verticies)
        
    output = image.copy()
    cv2.drawContours(output, [new_verticies], -1, (0, 255, 0), 2)
    cv2.imshow("Receipt Outline", output)
    cv2.waitKey(0)
        
    # apply a four-point perspective transform to the *original* image to
    # obtain a top-down bird's-eye view of the receipt
    receipt = four_point_transform(original_image, new_verticies.reshape(4, 2) * ratio)
    return receipt

def filter_image(image):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1]
    blur = cv2.GaussianBlur(thresh, (3,3), 0)
    invert = 255 - blur
    return invert

def process_image(image_path):
    image = cv2.imread(image_path)
    image = transform_image(image)
    image = filter_image(image)
    
    data = pytesseract.image_to_string(image, lang='eng', config='--psm 6')
    print(data)
    cv2.imshow(image_path, imutils.resize(image, width=500))
    cv2.waitKey(0)

for i in range(3, 10):
    process_image(f'backend\camera_backend\\test ({i}).jpg')
