from flask import Flask, render_template, jsonify, request

from functions.OFFInterface import OFFInterface

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
        # TODO - handle properly to send list of lists in correct format to leaderboard table
        leaderboard_table = {'leaderboard-rows' : [["1", "Joma", "23kg", "None"], ["2", "Coffeezilla", "25kg", "None"]]}
        return jsonify({"group-id" : "123"})



@app.route('/receiptscanner', methods=['GET', 'POST'])
def receiptscanner():
    if request.method == 'POST':
        return request.data


    elif request.method == 'GET':
        return jsonify({"Scanner" : "Page"})



@app.route('/shoppinglist', methods=['GET, POST'])
def shoppinglist():
    return jsonify({"Shopping" : "List"})



if __name__ == '__main__':
    app.run()