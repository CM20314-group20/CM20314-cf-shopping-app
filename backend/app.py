from flask import Flask, render_template, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
from sqlalchemy.ext.mutable import MutableList
from sqlalchemy import PickleType
import random, math, urllib
from product_data_backend import ProductData
from camera_backend.receipt_splitter import ReceiptScanner
import base64
import os

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =\
    'sqlite:////' + os.path.join(basedir, 'database.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
    
class User(db.Model):
    username = db.Column(db.String(100), nullable=False, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    data_metric = db.Column(db.String(80), unique=True, nullable=False)

    def __init__(self, username, email, data_metric):
        self.username = username
        self.email = email
        self.data_metric = data_metric

    def __repr__(self):
        return f'<User {self.username}>'
    
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
    data_metric = "Miles Driven"
    if request.method == 'POST':
        username = request.get_json()['username']
        email = request.get_json()['username']
        data_metric = request.get_json()['data_metric']
        s = User(username=username, email=email, data_metric=data_metric)
        db.session.add(s)
        db.session.commit()

        # TODO - calculate the CF in terms of the new metric and update home page
    return jsonify({"Metric" : data_metric})



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
        products = [{'product_name': 'barefoot white Zinfandel  ', 'category': 'Wine, white, sweet', 'co2_total_per_kg': 1.1}, {'product_name': 'js Tikka Masala Sauce  ', 'category': 'Indian-style sauce, tandoori or garam masala type, prepacked', 'co2_total_per_kg': 1.3}, {'product_name': 'haribo supermix  ', 'category': 'Candies, all types', 'co2_total_per_kg': 1.73}, {'product_name': 'haribo starmix  ', 'category': 'Candies, all types', 'co2_total_per_kg': 1.73}, {'product_name': 'haribo starmix  ', 'category': 'Candies, all types', 'co2_total_per_kg': 1.73}, {'product_name': 'haribo starmix  ', 'category': 'Candies, all types', 'co2_total_per_kg': 1.73}, {'product_name': 'm&ms crispy pouch  ', 'category': 'Chocolate confectionery, filled with nuts and/or praline', 'co2_total_per_kg': 9.72}, {'product_name': 'mms peanut pouch  ', 'category': 'Peanut', 'co2_total_per_kg': 4.16}]
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