import openfoodfacts
from typing import Final, Union, Callable, Any

# Dictionary keys of neccesary information. More can be added if required.
PRODUCT_KEYS : Final = ['_id', 'product_name', 'ecoscore_grade', 'ecoscore_score']
CO2_KEYS : Final = ['co2_agriculture', 'co2_consumption', 'co2_distribution', 'co2_packaging', 'co2_processing', 'co2_transportation', 'co2_total']

# Helper guard function to process requests which could return errors.
def try_request(function: Callable, args: dict) -> Any:
    try:
        return function(**args)
    except:
        # TODO Implement error handling.
        raise NotImplementedError

class OFF_Interface:
    # Process a single product dictionary and extract neccesary information.
    @staticmethod
    def process_product_dict(product: dict) -> dict:
        # Extract wanted keys and values from original product dictionary.
        new_dict = {k : product[k] for k in PRODUCT_KEYS if k in product}
        
        # If Ecoscore data is avaliable, proccess additional CO2 information.
        if product['ecoscore_grade'] not in ['not-applicable', 'unknown']:
            new_dict['co2_data'] = {k : product['ecoscore_data']['agribalyse'][k] for k in CO2_KEYS}
            new_dict['category'] = product['ecoscore_data']['agribalyse']['name_en']

        return new_dict
    
    # Get product information from name. Currently raises exception if no valid result found.
    @staticmethod
    def product_from_name(product_name: str) -> dict:
        response = try_request(openfoodfacts.products.search, {'query': product_name})
        num_pages = response['page_count']

        # Search results for a product with eco score avaliable.
        for page in range(1, num_pages+1):
            products = try_request(openfoodfacts.products.search, {'query': product_name, 'page' : page})['products']

            for product in products:
                if product['ecoscore_grade'] not in ['not-applicable', 'unknown']:
                    return OFF_Interface.process_product_dict(product)
        # TODO Handle not finding valid search result.
        raise Exception("No valid search results found.")


    # Get product information from barcode.
    @classmethod
    def product_from_barcode(cls, barcode: Union[int, str]) -> dict:
        if type(barcode) == int: barcode = str(barcode)

        result = try_request(openfoodfacts.products.get_product, {'barcode' : barcode})        
        status = result['status']

        if status != 1:
            # TODO Product not found
            raise Exception("No results found.")

        return cls.process_product_dict(result['product'])