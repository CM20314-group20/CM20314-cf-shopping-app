from unittest import TestCase

import cv2

from barcode_reader import BarcodeReader


class TestReceiptReader(TestCase):
    barcode_1 = None
    barcode_3_upside_down = None
    barcode_3_left = None
    barcode_3_right = None
    barcode_4_crimpled = None
    barcode_5_curved = None
    barcode_6_tilt = None

    @classmethod
    def setUpClass(cls) -> None:
        cls.barcode_1 = cv2.imread("test_barcodes/barcode_1.png")
        cls.barcode_3_upside_down = cv2.imread("test_barcodes/barcode_3_upside_down.png")
        cls.barcode_3_left = cv2.imread("test_barcodes/barcode_3_left.png")
        cls.barcode_3_right = cv2.imread("test_barcodes/barcode_3_right.png")
        cls.barcode_2 = cv2.imread("test_barcodes/barcode_12.png")
        cls.barcode_4_crimpled = cv2.imread("test_barcodes/barcode_4_crimpled.png")
        cls.barcode_5_curved = cv2.imread("test_barcodes/barcode_5_curved.jpg")
        cls.barcode_6_tilt = cv2.imread("test_barcodes/barcode_6_tilt.jpg")



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
        self.assertEqual("EAN13", barcodes[0].get_type(), "Incorrect barcode type")
    def test_barcode_4_reallife_image(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_4_crimpled)
        self.assertEqual("EAN13", barcodes[0].get_type(), "Type incorrect for crimpled barcode")
        self.assertEqual("5000168002286", barcodes[0].get_data(), "Incorrect barcode data on crimpled barcode")
    def test_barcode_5_reallife_image(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_5_curved)
        self.assertEqual("EAN13", barcodes[0].get_type(), "Type incorrect for curved barcode")
        self.assertEqual("5045098057319", barcodes[0].get_data(), "Incorrect barcode data on curved barcode")

    def test_barcode_6_reallife_image(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_6_tilt)
        self.assertEqual("EAN13", barcodes[0].get_type(), "Type incorrect for tilted barcode")
        self.assertEqual("096619482016", barcodes[0].get_data(), "Incorrect barcode data on tilted barcode")
    def test_barcode_3_rotation_upsidedown(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_3_upside_down)
        self.assertEqual("EAN13",barcodes[0].get_type(),"Upside down barcode does not work")

    def test_barcode_3_rotation_left(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_3_left)
        self.assertEqual("EAN13", barcodes[0].get_type(), "Rotation to left does not work")

    def test_barcode_3_rotation_right(self):
        barcodes = BarcodeReader.read_barcodes(self.barcode_3_right)
        self.assertEqual("EAN13", barcodes[0].get_type(), "Rotation to right does not work")
    #def test_barcode_2_quantity(self):
        #barcodes = BarcodeReader.read_barcodes(self.barcode_1)
        #self.assertEqual(3, len(barcodes), "Incorrect number of barcodes read")
    #def test_barcode_2_data(self):
        #barcodes = BarcodeReader.read_barcodes(self.barcode_2)
        #self.assertEqual("1234567890", barcodes[0].get_data(), "Incorrect barcode data of left barcode")
        #self.assertEqual("ABCD567890", barcodes[1].get_data(), "Incorrect barcode data of middle barcode")
        #self.assertEqual("ABCD567890", barcodes[2].get_data(), "Incorrect barcode data of right barcode")
    #def test_barcode_2_type(self):
        #barcodes = BarcodeReader.read_barcodes(self.barcode_2)
        #self.assertEqual("EAN13", barcodes[0].get_type(), "Incorrect barcode type")
    #def test_barcode_2_image(self):
        #barcodes = BarcodeReader.read_barcodes(self.barcode_2)
        #cv2.imshow("barcode_1", barcodes[0].get_barcode_image())
        #shows barcode
        #cv2.waitKey(0)
        #wont do anything until barcode is closed
        #cv2.destroyAllWindows()
        # self.assertEqual("EAN13", barcodes[0].get_type(), "Incorrect barcode type")
        #rotations barcode different way all up down left right
        #take barcode rotate it check barcode tester does info data 