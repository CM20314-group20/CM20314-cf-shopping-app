from flask import Flask, render_template, jsonify, request
import random, math, urllib
from product_data_backend import ProductData
from camera_backend.receipt_splitter import ReceiptScanner
import base64

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        # TODO - Get CF history from db for the user
        data = [
            random.uniform(0, 1) * 100,
            random.uniform(0, 1) * 100,
            random.uniform(0, 1) * 100,
            random.uniform(0, 1) * 100,
            random.uniform(0, 1) * 100,
            random.uniform(0, 1) * 100
                    ]
        return jsonify({"Data" : data})
    
    return jsonify({"Home" : "Page"})



@app.route('/settings', methods=['GET', 'POST'])
def settings():
    new_metric = ""
    if request.method == 'POST':

        new_metric = request.get_json()['metric']
        # TODO - calculate the CF in terms of the new metric and update home page
    return jsonify({"Metric" : new_metric})



@app.route('/social', methods=['GET', 'POST'])
def social():
    groupid = -1
    id_list = []
    if request.method == 'POST':
        if request.get_json()['data'] == 'Left Group':
            groupid = 0

        elif request.get_json()['data'] == 'Join Group':
            groupid = int(request.get_json()['group_id'])
            # TODO - get the users in the group
            id_list = [["1", "Joma", "23kg", "None"], ["2", "Coffeezilla", "25kg", "None"]]

        elif request.get_json()['data'] == 'Create Group':
            # TODO - Create new group with the user in
            groupid = int(request.get_json()['group_id'])

        # TODO - need to return all the other users in the group for the leaderboard
        return jsonify({"group-id" : groupid, "id-list" : id_list})

        
    elif request.method == 'GET':
        # TODO - get the user's group id from the database and return the user's and their data in that group
        return jsonify({"group-id" : groupid, "id-list" : [["1", "Joma", "23kg", "None"], ["2", "Coffeezilla", "25kg", "None"]]})


@app.route('/receiptscanner', methods=['GET', 'POST'])
def receiptscanner():
    if request.method == 'POST':
        data = request.get_json()
        base64_str = data['data']['_parts'][0][1]['base64']
        decoded_img = base64.b64decode(base64_str)
        
        # with open('backend/scanned-images/new-image.jpg', 'wb') as f:
        #     f.write(decoded_img)

        # products = ReceiptScanner.im_to_text('backend/scanned-images/new-image.jpg')
        # products = [ProductData.product_from_name(name) for name in products]
        products = [{'product_name': 'barefoot white Zinfandel  ', 'category': 'Wine, white, sweet', 'co2_total_per_kg': 1.1}, {'product_name': 'js Tikka Masala Sauce  ', 'category': 'Indian-style sauce, tandoori or garam masala type, prepacked', 'co2_total_per_kg': 1.3}, {'product_name': 'haribo supermix  ', 'category': 'Candies, all types', 'co2_total_per_kg': 1.73}, {'product_name': 'haribo starmix  ', 'category': 'Candies, all types', 'co2_total_per_kg': 2.43}, {'product_name': 'haribo starmix  ', 'category': 'Candies, all types', 'co2_total_per_kg': 3.66}, {'product_name': 'haribo starmix  ', 'category': 'Candies, all types', 'co2_total_per_kg': 3.77}, {'product_name': 'm&ms crispy pouch  ', 'category': 'Chocolate confectionery, filled with nuts and/or praline', 'co2_total_per_kg': 9.72}, {'product_name': 'mms peanut pouch  ', 'category': 'Peanut', 'co2_total_per_kg': 4.16}]
        return jsonify({"Image" : products})


    elif request.method == 'GET':
        print(request.data)
        return jsonify({"Scanner" : "Page"})


@app.route('/shoppinglist', methods=['GET', 'POST'])
def shoppinglist():
    # TODO - get items from db before hand
    items = ["Apple", "Pear", "Grape", "Chicken"]
    if request.method == 'GET':
        return jsonify({"Items" : items})
    
    elif request.method == 'POST':
        # TODO - update items correctly in db for the user so after refresh it shows updated items
        items = request.get_json()['data']
        return jsonify({"Items" : items})



if __name__ == '__main__':
    app.run(host='0.0.0.0', port='4000')