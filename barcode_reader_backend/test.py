from unittest import TestCase

import cv2
from barcode_errors import BarcodeNotDetectedError, MultipleBarcodesDetectedError
from barcode_reader import BarcodeReader


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

