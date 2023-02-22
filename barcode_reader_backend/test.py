from unittest import TestCase

import cv2
from barcode_errors import BarcodeNotDetectedError, MultipleBarcodesDetectedError
from barcode_reader import BarcodeReader


class TestBarcodeReader(TestCase):
    def test_barcode_1_data(self):
        barcode_1 = cv2.imread("test_barcodes/barcode_1.png")
        barcode = BarcodeReader.read_barcode(barcode_1)
        self.assertEqual("0011058619656", barcode.get_data(), "Incorrect barcode data")

    def test_barcode_1_type(self):
        barcode_1 = cv2.imread("test_barcodes/barcode_1.png")
        barcode = BarcodeReader.read_barcode(barcode_1)
        self.assertEqual("EAN13", barcode.get_type(), "Incorrect barcode type")

    def test_barcode_1_left_data(self):
        barcode_1 = cv2.imread("test_barcodes/barcode_1_left.png")
        barcode = BarcodeReader.read_barcode(barcode_1)
        self.assertEqual("0011058619656", barcode.get_data(), "Incorrect barcode data")

    def test_barcode_1_left_type(self):
        barcode_1_left = cv2.imread("test_barcodes/barcode_1_left.png")
        barcode = BarcodeReader.read_barcode(barcode_1_left)
        self.assertEqual("EAN13", barcode.get_type(), "Incorrect barcode type")

    def test_barcode_1_right_data(self):
        barcode_1 = cv2.imread("test_barcodes/barcode_1_right.png")
        barcode = BarcodeReader.read_barcode(barcode_1)
        self.assertEqual("0011058619656", barcode.get_data(), "Incorrect barcode data")

    def test_barcode_1_right_type(self):
        barcode_1_right = cv2.imread("test_barcodes/barcode_1_right.png")
        barcode = BarcodeReader.read_barcode(barcode_1_right)
        self.assertEqual("EAN13", barcode.get_type(), "Incorrect barcode type")

    def test_barcode_1_upside_down_data(self):
        barcode_1 = cv2.imread("test_barcodes/barcode_1_upside_down.png")
        barcode = BarcodeReader.read_barcode(barcode_1)
        self.assertEqual("0011058619656", barcode.get_data(), "Incorrect barcode data")

    def test_barcode_1_upside_down_type(self):
        barcode_1_upside_down = cv2.imread("test_barcodes/barcode_1_upside_down.png")
        barcode = BarcodeReader.read_barcode(barcode_1_upside_down)
        self.assertEqual("EAN13", barcode.get_type(), "Incorrect barcode type")

    def test_barcode_2_throws_multiple_barcode_error(self):
        barcode_2 = cv2.imread("test_barcodes/barcode_2.png")
        with self.assertRaises(MultipleBarcodesDetectedError):
            BarcodeReader.read_barcode(barcode_2)

    def test_barcode_3_data(self):
        barcode_3 = cv2.imread("test_barcodes/barcode_3.jpg")
        barcode = BarcodeReader.read_barcode(barcode_3)
        self.assertEqual("0657433004718", barcode.get_data(), "Incorrect barcode data")

    def test_barcode_3_type(self):
        barcode_3 = cv2.imread("test_barcodes/barcode_3.jpg")
        barcode = BarcodeReader.read_barcode(barcode_3)
        self.assertEqual("EAN13", barcode.get_type(), "Incorrect barcode type")


class TestBarcodeReaderImageCrop(TestCase):
    def test_barcode_1_image(self):
        barcode_1 = cv2.imread("test_barcodes/barcode_1.png")
        barcode = BarcodeReader.read_barcode(barcode_1)
        cv2.imshow("barcode_1", barcode.get_barcode_image())
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    def test_barcode_1_left_image(self):
        barcode_1_left = cv2.imread("test_barcodes/barcode_1_left.png")
        barcode = BarcodeReader.read_barcode(barcode_1_left)
        cv2.imshow("barcode_1", barcode.get_barcode_image())
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    def test_barcode_1_right_image(self):
        barcode_1_right = cv2.imread("test_barcodes/barcode_1_right.png")
        barcode = BarcodeReader.read_barcode(barcode_1_right)
        cv2.imshow("barcode_1", barcode.get_barcode_image())
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    def test_barcode_1_upside_down_image(self):
        barcode_1_upside_down = cv2.imread("test_barcodes/barcode_1_upside_down.png")
        barcode = BarcodeReader.read_barcode(barcode_1_upside_down)
        cv2.imshow("barcode_1", barcode.get_barcode_image())
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    def test_barcode_3_image(self):
        barcode_1 = cv2.imread("test_barcodes/barcode_3.jpg")
        barcode = BarcodeReader.read_barcode(barcode_1)
        cv2.imshow("barcode_3", barcode.get_barcode_image())
        cv2.waitKey(0)
        cv2.destroyAllWindows()
