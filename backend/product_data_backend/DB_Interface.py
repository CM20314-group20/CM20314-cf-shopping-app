import csv
from thefuzz import fuzz

# DATABASE_PATH = 'backend\product_data_backend\AgribalyseData.csv'
DATABASE_PATH = 'backend/product_data_backend/AgribalyseData.csv'

# Returns carbon footprint from product category by searching through local database.
def get_cf_from_category(category: str) -> tuple:
    highest_score = 0
    best_row = None
    
    with open(DATABASE_PATH) as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            score = fuzz.token_set_ratio(row['category'], category) + fuzz.token_sort_ratio(row['category'], category)
            if score > highest_score:
                highest_score = score
                best_row = row
    if not best_row is None:
        return (best_row['category'], float(best_row['co2']))
    else:
        return None, None