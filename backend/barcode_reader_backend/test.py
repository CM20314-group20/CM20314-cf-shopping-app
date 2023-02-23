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

    def test_barcode_2_raises_multiple_barcode_error(self):
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

    def test_barcode_3_left_data(self):
        barcode_3_left = cv2.imread("test_barcodes/barcode_3_left.jpg")
        barcode = BarcodeReader.read_barcode(barcode_3_left)
        self.assertEqual("0657433004718", barcode.get_data(), "Incorrect barcode data")

    def test_barcode_3_left_type(self):
        barcode_3_left = cv2.imread("test_barcodes/barcode_3_left.jpg")
        barcode = BarcodeReader.read_barcode(barcode_3_left)
        self.assertEqual("EAN13", barcode.get_type(), "Incorrect barcode type")

    def test_barcode_3_right_data(self):
        barcode_3_right = cv2.imread("test_barcodes/barcode_3_right.jpg")
        barcode = BarcodeReader.read_barcode(barcode_3_right)
        self.assertEqual("0657433004718", barcode.get_data(), "Incorrect barcode data")

    def test_barcode_3_right_type(self):
        barcode_3_right = cv2.imread("test_barcodes/barcode_3_right.jpg")
        barcode = BarcodeReader.read_barcode(barcode_3_right)
        self.assertEqual("EAN13", barcode.get_type(), "Incorrect barcode type")

    def test_barcode_3_upside_down_data(self):
        barcode_3 = cv2.imread("test_barcodes/barcode_3_upside_down.jpg")
        barcode = BarcodeReader.read_barcode(barcode_3)
        self.assertEqual("0657433004718", barcode.get_data(), "Incorrect barcode data")

    def test_barcode_3_upside_down_type(self):
        barcode_3_upside_down = cv2.imread("test_barcodes/barcode_3_upside_down.jpg")
        barcode = BarcodeReader.read_barcode(barcode_3_upside_down)
        self.assertEqual("EAN13", barcode.get_type(), "Incorrect barcode type")

    def test_barcode_4_raises_barcode_not_detected_error(self):
        barcode_4 = cv2.imread("test_barcodes/barcode_4.png")
        with self.assertRaises(BarcodeNotDetectedError):
            BarcodeReader.read_barcode(barcode_4)

    def test_barcode_5_curved_data(self):
        barcode_5 = cv2.imread("test_barcodes/barcode_5_curved.jpg")
        barcode = BarcodeReader.read_barcode(barcode_5)
        self.assertEqual("5045098057319", barcode.get_data(), "Incorrect barcode data")

    def test_barcode_5_curved_type(self):
        barcode_5 = cv2.imread("test_barcodes/barcode_5_curved.jpg")
        barcode = BarcodeReader.read_barcode(barcode_5)
        self.assertEqual("EAN13", barcode.get_type(), "Incorrect barcode type")

    def test_barcode_6_tilt_data(self):
        barcode_6 = cv2.imread("test_barcodes/barcode_6_tilt.jpg")
        barcode = BarcodeReader.read_barcode(barcode_6)
        self.assertEqual("0096619482016", barcode.get_data(), "Incorrect barcode data")

    def test_barcode_6_tilt_type(self):
        barcode_6 = cv2.imread("test_barcodes/barcode_6_tilt.jpg")
        barcode = BarcodeReader.read_barcode(barcode_6)
        self.assertEqual("EAN13", barcode.get_type(), "Incorrect barcode type")

    def test_barcode_7_raises_barcode_not_detected_error(self):
        barcode_7 = cv2.imread("test_barcodes/barcode_7.jpg")
        with self.assertRaises(BarcodeNotDetectedError):
            BarcodeReader.read_barcode(barcode_7)


class TestBarcodeReaderImageCrop(TestCase):
    def test_barcode_1_image(self):
        barcode_1 = cv2.imread("test_barcodes/barcode_1.png")
        barcode = BarcodeReader.read_barcode(barcode_1)
        cv2.imshow("barcode_1", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_1_left_image(self):
        barcode_1_left = cv2.imread("test_barcodes/barcode_1_left.png")
        barcode = BarcodeReader.read_barcode(barcode_1_left)
        cv2.imshow("barcode_1_left", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_1_right_image(self):
        barcode_1_right = cv2.imread("test_barcodes/barcode_1_right.png")
        barcode = BarcodeReader.read_barcode(barcode_1_right)
        cv2.imshow("barcode_1_right", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_1_upside_down_image(self):
        barcode_1_upside_down = cv2.imread("test_barcodes/barcode_1_upside_down.png")
        barcode = BarcodeReader.read_barcode(barcode_1_upside_down)
        cv2.imshow("barcode_1_upside_down", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_3_image(self):
        barcode_3 = cv2.imread("test_barcodes/barcode_3.jpg")
        barcode = BarcodeReader.read_barcode(barcode_3)
        cv2.imshow("barcode_3", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_3_left_image(self):
        barcode_3_left = cv2.imread("test_barcodes/barcode_3_left.jpg")
        barcode = BarcodeReader.read_barcode(barcode_3_left)
        cv2.imshow("barcode_3_left", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_3_right_image(self):
        barcode_3_right = cv2.imread("test_barcodes/barcode_3_right.jpg")
        barcode = BarcodeReader.read_barcode(barcode_3_right)
        cv2.imshow("barcode_3_right", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_3_upside_down_image(self):
        barcode_3_upside_down = cv2.imread("test_barcodes/barcode_3_upside_down.jpg")
        barcode = BarcodeReader.read_barcode(barcode_3_upside_down)
        cv2.imshow("barcode_3_upside_down", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_5_image(self):
        barcode_5 = cv2.imread("test_barcodes/barcode_5_curved.jpg")
        barcode = BarcodeReader.read_barcode(barcode_5)
        cv2.imshow("barcode_5", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_5_left_image(self):
        barcode_5_left = cv2.imread("test_barcodes/barcode_5_curved_left.jpg")
        barcode = BarcodeReader.read_barcode(barcode_5_left)
        cv2.imshow("barcode_5_left", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_5_right_image(self):
        barcode_5_right = cv2.imread("test_barcodes/barcode_5_curved_right.jpg")
        barcode = BarcodeReader.read_barcode(barcode_5_right)
        cv2.imshow("barcode_5_right", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_5_upside_down_image(self):
        barcode_5_upside_down = cv2.imread("test_barcodes/barcode_5_curved_upside_down.jpg")
        barcode = BarcodeReader.read_barcode(barcode_5_upside_down)
        cv2.imshow("barcode_5_upside_down", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_6_image(self):
        barcode_6 = cv2.imread("test_barcodes/barcode_6_tilt.jpg")
        barcode = BarcodeReader.read_barcode(barcode_6)
        cv2.imshow("barcode_6", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_6_left_image(self):
        barcode_6_left = cv2.imread("test_barcodes/barcode_6_tilt_left.jpg")
        barcode = BarcodeReader.read_barcode(barcode_6_left)
        cv2.imshow("barcode_6_left", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_6_right_image(self):
        barcode_6_right = cv2.imread("test_barcodes/barcode_6_tilt_right.jpg")
        barcode = BarcodeReader.read_barcode(barcode_6_right)
        cv2.imshow("barcode_6_right", barcode.get_barcode_image())
        cv2.waitKey(0)

    def test_barcode_6_upside_down_image(self):
        barcode_6_upside_down = cv2.imread("test_barcodes/barcode_6_tilt_upside_down.jpg")
        barcode = BarcodeReader.read_barcode(barcode_6_upside_down)
        cv2.imshow("barcode_6_upside_down", barcode.get_barcode_image())
        cv2.waitKey(0)
