"""https://www.geeksforgeeks.org/how-to-make-a-barcode-reader-in-python/ accessed 2023/02/14 at 11:35"""
from typing import List

import cv2
import numpy
from pyzbar import pyzbar
from barcode_errors import BarcodeNotDetectedError, MultipleBarcodesDetectedError
from barcode import Barcode


class BarcodeReader:
    # @staticmethod
    # def read_barcode(image: numpy.ndarray) -> Barcode:
    #     """
    #
    #     :param image:
    #     :return:
    #     """
    #     decoded_barcodes = pyzbar.decode(image)
    #     number_of_barcodes = len(decoded_barcodes)
    #
    #     if number_of_barcodes == 0:
    #         raise BarcodeNotDetectedError("Barcode not detected. Image has no barcode or is not readable.")
    #     elif number_of_barcodes > 1:
    #         raise MultipleBarcodesDetectedError("Multiple barcodes detected.")
    #
    #     barcode = decoded_barcodes[0]
    #     (x, y, w, h) = barcode.rect
    #     barcode_image = image[y:y + h, x:x + h]
    #     return Barcode(barcode.data.decode("utf-8"), barcode.type, barcode_image)

    @staticmethod
    def read_barcode(image: numpy.ndarray) -> Barcode:
        """

        :param image:
        :return:
        """
        decoded_barcodes = pyzbar.decode(image)
        number_of_barcodes = len(decoded_barcodes)

        if number_of_barcodes == 0:
            raise BarcodeNotDetectedError("Barcode not detected. Image has no barcode or is not readable.")
        elif number_of_barcodes > 1:
            raise MultipleBarcodesDetectedError("Multiple barcodes detected.")

        barcode = decoded_barcodes[0]
        (x, y, w, h) = barcode.rect
        x1, x2 = (x - 20), (x + w + 20)
        y1, y2 = (y - 120), (y + h + 20)
        barcode_image = image[y1:y2, x1:x2]
        return Barcode(barcode.data.decode("utf-8"), barcode.type, barcode_image)

    @staticmethod
    def _get_barcode_image(original_image: numpy.ndarray, decoded_barcode: pyzbar.Decoded):
        """

        :param image_array:
        :param detected_barcodes:
        :return:
        """
        # RGB = (255, 0, 0)
        # WIDTH = 0

        (x, y, w, h) = decoded_barcode.rect
        return original_image[y:y + h, x:x + h]

    # @staticmethod
    # def _simplify_barcode_data(original_image: numpy.ndarray, decoded_barcode: pyzbar.Decoded):
    #     """
    #
    #     :param original_image:
    #     :param decoded_barcode:
    #     :return:
    #     """
    #     barcode_image = BarcodeReader._get_barcode_image(original_image, decoded_barcode)
    #     return Barcode(decoded_barcode.data.decode("utf-8"), decoded_barcode.type, barcode_image)
    #
    # @staticmethod
    # def _get_barcode_image(original_image: numpy.ndarray, decoded_barcode: pyzbar.Decoded):
    #     """
    #
    #     :param image_array:
    #     :param detected_barcodes:
    #     :return:
    #     """
    #     # RGB = (255, 0, 0)
    #     # WIDTH = 0
    #
    #     (x, y, w, h) = decoded_barcode.rect
    #     return original_image[y:y + h, x:x + h]
    #
    # @staticmethod
    # def _load_image(image_path: str):
    #     """
    #
    #     :param image_path:
    #     :return:
    #     """
    #     return cv2.imread(image_path)
