import unittest

import difflib

from receipt_splitter import ReceiptScanner


def getRatio(s1: str, s2: str) -> float:
    # Get a SequenceMatcher object from difflib

    matcher = difflib.SequenceMatcher(None, s1, s2)

    # Get the ratio of similarity between the two strings

    similarity_ratio = matcher.ratio()

    return similarity_ratio


receipt_products = [
    ['think 25 cashier confirmed over 18', 'barefoot white zinfandel', 'js tikka masala sauce', 'haribo supermix',
     'haribo starmix', 'haribo starmix', 'item cancelled', 'haribo starmix', 'm&ms crispy pouch', 'm&ms peanut pouch'],

    ['js kitchen towels x3', 'quilted velvet x4', 'js strawberries 400g', 'js strawberries 400g', 'js eggs x6',
     'js whole milk 2.272l', 'taste the difference orange juice', 'galaxy milk', 'pantene conditioner',
     'js broccoli, courgette, carrot, peas', 'haagen dazs cookie ice cream', 'js drinking chocolat'],

    ['js lemonade 2l', 'js lemonade 2l', 'ice cubes', 'ice cubes', 'ice cubes', 'js mixed peppers x 3',
     'js fresh mint', 'js fresh mint', 'bag for life', 'alpro caffe caramel 1l', 'pre packaged limes x5',
     'lemon and lime x', 'js thai jasmine rice', 'aubergine', 'aubergine', 'js 2 salmon fillets', 'js king prawns 155g',
     'chicken fillets', 'think 25 cashier confirmed over 18', 'singha thai beer', 'singha thai beer', 'lactose free whole milk',
     'singha thai beer', 'stella artois 4x568', 'havana club rum 70cl', 'slow beef roast',
     'baileys strawberry and cream 70c']

    ['js tex-mex mini dips', 'lindor strawberries and cream', 'maggi 2-minute noodles', 'maggi 2-minute noodles']

]

receipts_names = ['backend/camera-backend/test_receipt1.jpg', 'backend/camera-backend/test_receipt3.jpg',
                  'backend/camera-backend/test_receipt6.jpg', 'backend/camera-backend/test_receipt7_straight.jpeg',
                  'backend/camera-backend/test_receipt7_45.jpeg', 'backend/camera-backend/test_receipt7_90.jpeg',
                  'backend/camera-backend/test_receipt7_135.jpeg', 'backend/camera-backend/test_receipt7_180.jpeg']


class TestReceiptSanner(unittest.TestCase):

    def formatting(self, test_num, avg):

        print(f"----------test receipt {test_num}----------")

        print(f"test accuracy: {avg}")

        print("-" * 35)

        print()

    def test_receipt1(self):

        # get the product from the receipt using:

        current_receipt = ReceiptScanner.im_to_text(receipts_names[0])

        total_accuracies = 0

        # get average percent difference over all products on receipt

        compare_list = list(zip(current_receipt, receipt_products[0]))

        for pair in compare_list:
            total_accuracies += getRatio(pair[0], pair[1])

        avg = total_accuracies / len(compare_list)

        self.formatting(1, avg)

        self.assertTrue(avg >= 0.8, msg='accuracy too low: ' + str(avg))

    def test_receipt2(self):

        # get the product from the receipt using:

        current_receipt = ReceiptScanner.im_to_text(receipts_names[1])

        total_accuracies = 0

        # get average percent difference over all products on receipt

        compare_list = list(zip(current_receipt, receipt_products[1]))

        for pair in compare_list:
            total_accuracies += getRatio(pair[0], pair[1])

        avg = total_accuracies / len(compare_list)

        self.formatting(2, avg)

        self.assertTrue(avg >= 0.8, msg='accuracy too low: ' + str(avg))


    def test_receipt3(self):

        # get the product from the receipt using:

        current_receipt = ReceiptScanner.im_to_text(receipts_names[2])

        total_accuracies = 0

        # get average percent difference over all products on receipt

        compare_list = list(zip(current_receipt, receipt_products[2]))

        for pair in compare_list:
            total_accuracies += getRatio(pair[0], pair[1])

        avg = total_accuracies / len(compare_list)

        self.formatting(2, avg)

        self.assertTrue(avg >= 0.8, msg='accuracy too low: ' + str(avg))

    def test_receipt4_straight(self):

        # get the product from the receipt using:

        current_receipt = ReceiptScanner.im_to_text(receipts_names[3])

        total_accuracies = 0

        # get average percent difference over all products on receipt

        compare_list = list(zip(current_receipt, receipt_products[3]))

        for pair in compare_list:
            total_accuracies += getRatio(pair[0], pair[1])

        avg = total_accuracies / len(compare_list)

        self.formatting(2, avg)

        self.assertTrue(avg >= 0.8, msg='accuracy too low: ' + str(avg))

    def test_receipt4_45(self):

        # get the product from the receipt using:

        current_receipt = ReceiptScanner.im_to_text(receipts_names[4])

        total_accuracies = 0

        # get average percent difference over all products on receipt

        compare_list = list(zip(current_receipt, receipt_products[3]))

        for pair in compare_list:
            total_accuracies += getRatio(pair[0], pair[1])

        avg = total_accuracies / len(compare_list)

        self.formatting(2, avg)

        self.assertTrue(avg >= 0.8, msg='accuracy too low: ' + str(avg))

    def test_receipt4_90(self):

        # get the product from the receipt using:

        current_receipt = ReceiptScanner.im_to_text(receipts_names[5])

        total_accuracies = 0

        # get average percent difference over all products on receipt

        compare_list = list(zip(current_receipt, receipt_products[3]))

        for pair in compare_list:
            total_accuracies += getRatio(pair[0], pair[1])

        avg = total_accuracies / len(compare_list)

        self.formatting(2, avg)

        self.assertTrue(avg >= 0.8, msg='accuracy too low: ' + str(avg))

    def test_receipt4_135(self):

        # get the product from the receipt using:

        current_receipt = ReceiptScanner.im_to_text(receipts_names[6])

        total_accuracies = 0

        # get average percent difference over all products on receipt

        compare_list = list(zip(current_receipt, receipt_products[3]))

        for pair in compare_list:
            total_accuracies += getRatio(pair[0], pair[1])

        avg = total_accuracies / len(compare_list)

        self.formatting(2, avg)

        self.assertTrue(avg >= 0.8, msg='accuracy too low: ' + str(avg))

    def test_receipt4_180(self):

        # get the product from the receipt using:

        current_receipt = ReceiptScanner.im_to_text(receipts_names[7])

        total_accuracies = 0

        # get average percent difference over all products on receipt

        compare_list = list(zip(current_receipt, receipt_products[3]))

        for pair in compare_list:
            total_accuracies += getRatio(pair[0], pair[1])

        avg = total_accuracies / len(compare_list)

        self.formatting(2, avg)

        self.assertTrue(avg >= 0.8, msg='accuracy too low: ' + str(avg))


if __name__ == '__main__':
    unittest.main()