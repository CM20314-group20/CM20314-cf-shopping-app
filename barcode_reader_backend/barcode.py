class Barcode:
    def __init__(self, barcode_data, barcode_type, barcode_image):
        self._data = barcode_data
        self._type = barcode_type
        self._barcode_image = barcode_image

    def get_data(self):
        return self._data

    def get_type(self):
        return self._type

    def get_barcode_image(self):
        return self._barcode_image
