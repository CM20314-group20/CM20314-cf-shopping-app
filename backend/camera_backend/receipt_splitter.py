# pip install pytesseract
# download tesseract from here (windows) = dhttps://github.com/UB-Mannheim/tesseract/wiki 
# or check under 'binaries' for other versions = https://tesseract-ocr.github.io/tessdoc/Home.html 

import pytesseract as tess
# tess.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'   # locaton of teserract-orc file and make sure to include \tesseract.exe at end
from PIL import Image
# import openfoodfacts
import cv2
import numpy as np
# databse of abbreviatons and remove_abbreviations function
from . import abbreviations_dict

class ReceiptScanner:

    # takes image src as input and returns it as text
    @classmethod
    def OCR(self, image_name: str) -> str:
        img = cv2.imread(image_name, 0) 
        return tess.image_to_string(img)


    # takes string as input and removes non-alphanumeric and number characters
    # can be changed to keep numbers for product weights
    @classmethod
    def clean_string(self, input: str) -> str:
        input = input.lower()
        out = ''

        # check if empty string
        if len(input) == 0: return out

        while True:
            # check if first letter is x if so remove
            if input[0] == 'x' or input[0] == '*':
                input = input[1:]
            else:
                break

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

        # loop OCR text and cut out unnecessary fluff
        def process_text(text):
            sections = []
            add = False
            
            for row in text:
                row = row.lower()
                # terminate if end of recipt keyword found
                if any(word in row for word in {'balance', 'total', 'join', 'due', 'clubcard'}):
                    return sections
                
                
                # if start of receipt keyword found start adding text
                if any(word in row for word in {'vat', 'number'}):
                    add = True
                # ignore lines with certain words
                elif any(word in row for word in {'item', 'cashier'}):
                    continue
                # if line isnt blank, and start of recipt found, clean and add to list
                elif add and not row in {'', ' '}:
                    sections.append(self.clean_string(row))
            return sections

        return process_text(text)


        # for row in text:
        #     print(row)

        #     current = row.split(' ')
        #     if len(current) >= 2:
        #         if current[0] == 'Vat' or current[1] == 'Number':
        #             add = True
        #         if current[1].lower() in {'balance', 'total'}:
        #             add = False
        #     if add and row != '':
        #         sections.append(self.clean_string(row))

        # return sections[1:]