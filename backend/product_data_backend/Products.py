import openfoodfacts
from typing import Final, Union, Callable, Any
from .Freq_Dict import Freq_Dict
from .DB_Interface import get_cf_from_category

# Helper guard function to process requests which could return errors.
def _try_request(function: Callable, args: dict) -> Any:
    try:
        return function(**args)
    # TODO Decide on proper error handling.
    except Exception as err:
        print(20*"-")
        print(f"Function called: {function}, with arguments: {args}.")
        print(f"Unexpected {err=}, {type(err)=}")
        raise

# Gets most frequent category from product name search.
def _get_most_freq_category(product_name: str) -> list:
    frequencies = Freq_Dict()

    response = _try_request(openfoodfacts.products.search, {'query': product_name})
    products = response['products']

    for product in products:
        if 'categories' in product.keys():
            frequencies.add(product['categories'])
            
    return frequencies.get_most_freq()

class ProductData:
    # Get product information from name.
    @staticmethod
    def product_from_name(product_name: str) -> dict:
    # Search results for a product.
        products = _try_request(openfoodfacts.products.search, {'query': product_name})['products']

        found_match = False
        for product in products:
            if product['ecoscore_grade'] not in ['not-applicable', 'unknown']:
                category = product['ecoscore_data']['agribalyse']['name_en']
                _, co2_data = get_cf_from_category(category)
                found_match = True
            
        if not found_match:
            # If close match cannot be found, revert to category database
            category = _get_most_freq_category(product_name)
            if category in {None, '', ' '}:
                category = product_name
            category, co2_data = get_cf_from_category(category)
            
        product = {'product_name' : product_name,
                   'category': category,
                   'co2_total_per_kg' : co2_data}
        return product

    # Get product information from barcode. Will return products with no eco data avaliable.
    @staticmethod
    def product_from_barcode(barcode: Union[int, str]) -> dict:
        if type(barcode) == int: barcode = str(barcode)

        result = _try_request(openfoodfacts.products.get_product, {'barcode' : barcode})        
        status = result['status']

        if status != 1:
            return None

        product = result['product']
        product_name = product['product_name']
        if product['ecoscore_grade'] not in ['not-applicable', 'unknown']:
                category = product['ecoscore_data']['agribalyse']['name_en']
                _, co2_data = get_cf_from_category(category)
        else:
            ProductData.product_from_name(product_name)
                
        return {'product_name':product_name,
                'category':category,
                'co2_total_per_kg':co2_data}