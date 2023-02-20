from unittest import TestCase

import cv2

from barcode_reader import BarcodeReader


class TestReceiptReader(TestCase):
    barcode_1 = None

    @classmethod
    def setUpClass(cls) -> None:
        cls.barcode_1 = cv2.imread("test_barcodes/barcode_1.png")
        cls.barcode_2 = cv2.imread("test_barcodes/barcode_12.png")

    def test_barcode_1_quantity(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_1)
        self.assertEqual(1, len(barcodes), "Incorrect number of barcodes read")

    def test_barcode_1_data(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_1)
        self.assertEqual("0011058619656", barcodes[0].get_data(), "Incorrect barcode data")

    def test_barcode_1_type(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_1)
        self.assertEqual("EAN13", barcodes[0].get_type(), "Incorrect barcode type")
    def test_barcode_1_image(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_1)
        cv2.imshow("barcode_1", barcodes[0].get_barcode_image())
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        # self.assertEqual("EAN13", barcodes[0].get_type(), "Incorrect barcode type")
    def test_barcode_2_quantity(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_1)
        self.assertEqual(3, len(barcodes), "Incorrect number of barcodes read")
    def test_barcode_2_data(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_2)
        self.assertEqual("1234567890", barcodes[0].get_data(), "Incorrect barcode data of left barcode")
        self.assertEqual("ABCD567890", barcodes[1].get_data(), "Incorrect barcode data of middle barcode")
        self.assertEqual("ABCD567890", barcodes[2].get_data(), "Incorrect barcode data of right barcode")
    def test_barcode_2_type(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_2)
        self.assertEqual("EAN13", barcodes[0].get_type(), "Incorrect barcode type")
    def test_barcode_2_image(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_2)
        cv2.imshow("barcode_1", barcodes[0].get_barcode_image())
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        # self.assertEqual("EAN13", barcodes[0].get_type(), "Incorrect barcode type")