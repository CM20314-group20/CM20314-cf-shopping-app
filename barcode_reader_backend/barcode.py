import numpy


class Barcode:
    def __init__(self, barcode_data: str, barcode_type: str, barcode_image: numpy.ndarray):
        self._data = barcode_data
        self._type = barcode_type
        self._barcode_image = barcode_image

    def get_data(self) -> str:
        return self._data

    def get_type(self) -> str:
        return self._type

    def get_barcode_image(self) -> numpy.ndarray:
        return self._barcode_image
