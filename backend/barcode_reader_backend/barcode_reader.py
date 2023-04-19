"""
Python barcode reader created by modifying code from
meetsuvariya. (2022) How to Make a Barcode Reader in Python?
Available at: https://www.geeksforgeeks.org/how-to-make-a-barcode-reader-in-python/ (Accessed: 2023/02/14)."""
import cv2
import numpy as np
from pyzbar import pyzbar
from .barcode_errors import BarcodeNotDetectedError, MultipleBarcodesDetectedError
from .barcode import Barcode


class BarcodeReader:
    """
    Barcode reader to decode a barcode in an image.
    """

    @staticmethod
    def read_barcode(image: np.ndarray) -> Barcode:
        """
        Find barcode in image and return Barcode object.
        No barcodes detected will raise a BarcodeNotDetectedError.
        More than one barcode detected will raise a MultipleBarcodesDetectedError.
        :param image: Image in the form of a numpy array.
        :return: Barcode object with the data, type and cropped image of the barcode.
        """
        image = cv2.resize(image, dsize=(400, 400), interpolation=cv2.INTER_CUBIC)
        decoded_barcodes = pyzbar.decode(image)
        number_of_barcodes = len(decoded_barcodes)

        if number_of_barcodes == 1:
            decoded_barcode = decoded_barcodes[0]
            barcode_image = BarcodeReader._crop_barcode_image(image, decoded_barcode)
            return Barcode(decoded_barcode.data.decode("utf-8"), decoded_barcode.type, barcode_image)
        elif number_of_barcodes == 0:
            return -1
            raise BarcodeNotDetectedError("Barcode not detected. Image has no barcode or is not readable.")
        elif number_of_barcodes > 1:
            return -1
            raise MultipleBarcodesDetectedError("Multiple barcodes detected.")

    @staticmethod
    def _crop_barcode_image(image: np.ndarray, decoded_barcode: pyzbar.Decoded):
        """
        Crop the barcode from the original image.
        :param image: Image in the form of a numpy array.
        :param decoded_barcode: Decoded Barcode from pyzbar.
        :return: Cropped image containing the barcode.
        """
        max_y, max_x, _ = image.shape
        (x, y, w, h) = decoded_barcode.rect
        x1 = max(0, (x - 100))
        x2 = min(max_x, (x + w + 100))
        y1 = max(0, (y - 100))
        y2 = min(max_y, (y + h + 100))
        rotations_to_upright = {"UP": 0, "RIGHT": 1, "DOWN": 2, "LEFT": 3}[decoded_barcode.orientation]
        return np.rot90(image[y1:y2, x1:x2], rotations_to_upright)
