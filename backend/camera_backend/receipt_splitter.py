# pip install pytesseract
# download tesseract from here (windows) = dhttps://github.com/UB-Mannheim/tesseract/wiki 
# or check under 'binaries' for other versions = https://tesseract-ocr.github.io/tessdoc/Home.html 

import pytesseract as tess
tess.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'   # locaton of teserract-orc file and make sure to include \tesseract.exe at end
from PIL import Image
# import openfoodfacts

# databse of abbreviatons and remove_abbreviations function
import abbreviations_dict


class ReceiptScanner:

    # takes image src as input and returns it as text
    @classmethod
    def OCR(self, image_name: str) -> str:
        img = Image.open(image_name)   # location of image to be processed
        return tess.image_to_string(img)


    # takes string as input and removes non-alphanumeric and number characters
    # can be changed to keep numbers for product weights
    @classmethod
    def clean_string(self, input: str) -> str:
        input = input.lower()
        out = ''

        # check if empty string
        if len(input) == 0: return out

        # check if first letter is x if so remove
        if input[0] == 'x' or input[0] == '*':
            input = input[1:]

        # remove random simbols and numbers from ocr
        for i in input:
            if ((i >= 'a' and i <= 'z') or i == ' ' or i == '/' or i == '&'):
                out += i

        return abbreviations_dict.remove_abbreviations(out)


    # takes image source as input and returns products in list
    @classmethod
    def im_to_text(self, image_name: str) -> list:
        text = self.OCR(image_name)

        text = text.split('\n')
        sections = []
        add = False

        # loop OCR text and cut out unnecessary fluff
        
        # for sainsburys receipts
        for row in text:
            current = row.split(' ')
            if len(current) >= 2:
                if current[0] == 'Vat' or current[1] == 'Number':
                    add = True
                if current[1] == "BALANCE":
                    add = False
            if add and row != '':
                sections.append(self.clean_string(row))
        
        return sections[1:]


# current = ReceiptScanner
# image_name = 'camera-backend/test_receipt3.jpg'
# output = current.im_to_text(image_name)
# print(output)

# print(current.OCR(image_name))

# # api call to search from openfoodfacts
# out = openfoodfacts.products.search('STRAWBERRIES 400G')
# print(out)




