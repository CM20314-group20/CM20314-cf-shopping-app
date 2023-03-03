import openfoodfacts
from typing import Final, Union, Callable, Any
from .Freq_Dict import Freq_Dict
from .DB_Interface import get_cf_from_category


# Dictionary keys of neccesary information. More can be added if required.
PRODUCT_KEYS : Final = ['_id', 'product_name', 'ecoscore_grade', 'ecoscore_score', '_keywords']
CO2_KEYS : Final = ['co2_agriculture', 'co2_consumption', 'co2_distribution', 'co2_packaging', 'co2_processing', 'co2_transportation', 'co2_total']

# Helper guard function to process requests which could return errors.
def _try_request(function: Callable, args: dict) -> Any:
    try:
        return function(**args)
    # TODO Decide on proper error handling.
    except Exception as err:
        print(f"Unexpected {err=}, {type(err)=}")
        raise

# Process a single product dictionary and extract neccesary information.
def _process_product_dict(product: dict) -> dict:
    # Extract wanted keys and values from original product dictionary.
    new_dict = {k : product[k] for k in PRODUCT_KEYS if k in product}
    
    # If Ecoscore data is avaliable, proccess additional CO2 information.
    if product['ecoscore_grade'] not in ['not-applicable', 'unknown']:
        new_dict['co2_data'] = {k : product['ecoscore_data']['agribalyse'][k] for k in CO2_KEYS}
        new_dict['category'] = product['ecoscore_data']['agribalyse']['name_en']

    return new_dict

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
        response = _try_request(openfoodfacts.products.search, {'query': product_name})
        num_pages = response['page_count']

        # Search results for a product.
        for page in range(1, num_pages+1):
            products = _try_request(openfoodfacts.products.search, {'query': product_name, 'page' : page})['products']

            for product in products:
                if product['ecoscore_grade'] not in ['not-applicable', 'unknown']:
                    return _process_product_dict(product)

        # If close match cannot be found, revert to category database
        category = _get_most_freq_category(product_name)
        product = {'product_name' : product_name,
                   'category': category,
                   'co2_data' : {'co2_total_per_kg' : get_cf_from_category(category)}}
        return product

    # Get product information from barcode. Will return products with no eco data avaliable.
    @staticmethod
    def product_from_barcode(barcode: Union[int, str]) -> dict:
        if type(barcode) == int: barcode = str(barcode)

        result = _try_request(openfoodfacts.products.get_product, {'barcode' : barcode})        
        status = result['status']

        if status != 1:
            return None

        return _process_product_dict(result['product'])