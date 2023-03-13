from flask import Flask, render_template, jsonify, request
import random, math, urllib
from product_data_backend import ProductData
# from camera_backend import receipt_splitter
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
    if request.method == 'POST':
        if request.get_json()['data'] == 'Left Group':
            groupid = 0

        elif request.get_json()['data'] == 'Join Group':
            groupid = int(request.get_json()['group_id'])

        elif request.get_json()['data'] == 'Create Group':
            # TODO - Create new group with the user in
            groupid = int(request.get_json()['group_id'])

        return jsonify({"group-id" : groupid})

        
    elif request.method == 'GET':
        # TODO - get the user's group id from the database and return the user's and their data in that group
        return jsonify({"group-id" : groupid, "id-list" : [["1", "Joma", "23kg", "None"], ["2", "Coffeezilla", "25kg", "None"]]})


@app.route('/receiptscanner', methods=['GET', 'POST'])
def receiptscanner():
    if request.method == 'POST':
        data = request.get_json()
        base64_str = data['data']['_parts'][0][1]['base64']
        decoded_img = base64.b64decode(base64_str)
        
        # print(decoded_img)
        # with open('backend/scanned-images/new-image.jpg', 'wb') as f:
        #     f.write(decoded_img)

        # TODO - OCR this image "decoded_img" and return everything that we need for front end, takes a while for the image to load

        return jsonify({"Image" : "Data"})


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