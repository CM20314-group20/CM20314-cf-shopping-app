from flask import Flask, render_template, jsonify, request

# from product_data_backend import ProductData

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return jsonify({"Hello" : "World"})



@app.route('/settings', methods=['GET, POST'])
def settings():
    return jsonify({"Settings" : "Page"})



@app.route('/social', methods=['GET', 'POST'])
def social():
    if request.method == 'POST':
        return "Hello world"

    elif request.method == 'GET':
        return jsonify({"group-id" : "123", "id-list" : [["1", "Joma", "23kg", "None"], ["2", "Coffeezilla", "25kg", "None"]]})



@app.route('/receiptscanner', methods=['GET', 'POST'])
def receiptscanner():
    if request.method == 'POST':
        return request.data


    elif request.method == 'GET':
        return jsonify({"Scanner" : "Page"})



@app.route('/shoppinglist', methods=['GET', 'POST'])
def shoppinglist():
    # TODO - get items from db before hand
    items = ["Apple", "Pear", "Grape", "Chicken"]
    if request.method == 'GET':
        return jsonify({"Items" : items})
    
    elif request.method == 'POST':
        # TODO - update items in db for the user
        items = request.get_json()['data']
        return ""



if __name__ == '__main__':
    app.run()