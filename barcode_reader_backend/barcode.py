import numpy


class Barcode:
    """
    Barcode representation.
    """

    def __init__(self, barcode_data: str, barcode_type: str, barcode_image: numpy.ndarray):
        self._data = barcode_data
        self._type = barcode_type
        self._barcode_image = barcode_image

    def get_data(self) -> str:
        """
        Getter for barcode data.
        :return: Barcode data as string.
        """
        return self._data

    def get_type(self) -> str:
        """
        Getter for barcode type.
        :return: Barcode type as string.
        """
        return self._type

    def get_barcode_image(self) -> numpy.ndarray:
        """
        Getter for barcode image.
        :return: Barcode image as numpy array.
        """
        return self._barcode_image
