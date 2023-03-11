from flask import Flask, render_template, jsonify, request
import random, math, urllib
from product_data_backend import ProductData
# from camera_backend import receipt_splitter

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
        print(data)
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
        return jsonify({"group-id" : groupid, "id-list" : [["1", "Joma", "23kg", "None"], ["2", "Coffeezilla", "25kg", "None"]]})


@app.route('/receiptscanner', methods=['GET', 'POST'])
def receiptscanner():
    if request.method == 'POST':
        data = request.get_json()
        image_uri = data['data']['_parts'][0][1]['uri']
        image = urllib.request.urlopen(image_uri)

        # with open('backend/scanned-images/new-image.jpg', 'wb') as f:
            # f.write(image.file.read())
        
        # TODO - OCR this image and return everything that we need for front end

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
    app.run()