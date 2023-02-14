from unittest import TestCase
from barcode_reader import BarcodeReader


class TestReceiptReader(TestCase):
    def test_barcode_1_quantity(self):
        image_path = "test_barcodes/barcode_1.png"
        barcodes = BarcodeReader.read_barcodes(image_path)
        self.assertEqual(1, len(barcodes), "Incorrect number of barcodes read")

    def test_barcode_1_data(self):
        image_path = "test_barcodes/barcode_1.png"
        barcodes = BarcodeReader.read_barcodes(image_path)
        self.assertEqual(b"0011058619656", barcodes[0].get_data(), "Incorrect barcode data")

    def test_barcode_1_type(self):
        image_path = "test_barcodes/barcode_1.png"
        barcodes = BarcodeReader.read_barcodes(image_path)
        self.assertEqual("EAN13", barcodes[0].get_type(), "Incorrect barcode type")
