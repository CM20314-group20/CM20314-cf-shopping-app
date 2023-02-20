"""https://www.geeksforgeeks.org/how-to-make-a-barcode-reader-in-python/ accessed 2023/02/14 at 11:35"""

import cv2
from pyzbar.pyzbar import decode
from barcode_not_detected_error import BarcodeNotDetectedError
from barcode import Barcode


class BarcodeReader:
    @staticmethod
    def read_barcodes(image):
        detected_barcodes = decode(image)

        if not detected_barcodes:
            raise BarcodeNotDetectedError("Barcode Not Detected or your barcode is blank/corrupted!")

        return BarcodeReader._simplify_barcode_data(image, detected_barcodes)

    @staticmethod
    def _simplify_barcode_data(image_array, detected_barcodes):
        barcodes = list()
        barcode_images = BarcodeReader._get_barcode_images(image_array, detected_barcodes)
        for detected_barcode, barcode_image in zip(detected_barcodes, barcode_images):
            barcode_data = detected_barcode.data.decode("utf-8")
            barcode_type = detected_barcode.type
            barcodes.append(Barcode(barcode_data, barcode_type, barcode_image))
        return tuple(barcodes)

    @staticmethod
    def _get_barcode_images(image_array, detected_barcodes):
        barcode_images = list()
        RGB = (255, 0, 0)
        WIDTH = 0
        for barcode in detected_barcodes:
            (x, y, w, h) = barcode.rect
            pos1 = (x - 20), (y - 120)
            pos2 = (x + w + 20), (y + h + 20)
            barcode_images.append(cv2.rectangle(image_array, pos1, pos2, RGB, WIDTH))
        return tuple(barcode_images)

    @staticmethod
    def _load_image(image_path):
        return cv2.imread(image_path)
