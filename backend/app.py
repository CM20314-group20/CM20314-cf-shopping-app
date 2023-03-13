from flask import Flask, render_template, jsonify, request, Response, make_response
import json
from PIL import Image
import base64
from io import BytesIO

from functions.OFFInterface import OFFInterface

app = Flask(__name__)


@app.route('/', methods=['GET'])
def home():
    return jsonify({"Hello": "World"})


@app.route('/settings', methods=['GET, POST'])
def settings():
    return jsonify({"Settings": "Page"})


@app.route('/social', methods=['GET', 'POST'])
def social():
    if request.method == 'POST':
        return "Hello world"

    elif request.method == 'GET':
        return jsonify({"group-id": "123", "id-list": [["1", "Joma", "23kg", "None"], ["2", "Coffeezilla", "25kg", "None"]]})


@app.route('/receiptscanner', methods=['GET', 'POST'])
def receiptscanner():
    if request.method == 'POST':

        print(request)

        if 'image' not in request.files:
            return jsonify({'error': 'No image found in request'}), 400

        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No file name found in request'}), 400

        # Save the file to the server
        file.save('image.jpg')

        # image = Image.open(io.BytesIO(request.data))
        # image.show()
        # string_obj = request.data.decode('utf-8')
        # dict_obj = json.loads(string_obj)
        # str_image = dict_obj['data']['_parts'][0][1]['blob']
        # image.show()
        # print(str_image)
        # binary_image = base64.b64decode(str_image)
        # image = Image.open(BytesIO(binary_image))
        # image.save('images/image.jpg')

        # response = make_response('Thanks for submitting the form')
        # response.headers['Content-Type'] = 'text/plain'
        # response.status_code = 200
        print(request)
        return jsonify(
            message='Image saved'
        )

    elif request.method == 'GET':
        return jsonify({"Scanner": "Page"})


@app.route('/shoppinglist', methods=['GET, POST'])
def shoppinglist():
    return jsonify({"Shopping": "List"})


if __name__ == '__main__':
    app.run()
