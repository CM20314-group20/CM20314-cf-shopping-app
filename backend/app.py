from flask import Flask, render_template, jsonify

# FIXME - importing classes from /backend/functions
# import OFFInterface 

app = Flask(__name__)

@app.route('/home', methods=['GET'])
def home():
    return jsonify({"Hello" : "World"})

@app.route('/social', methods=['GET'])
def social():
    return jsonify({"Join" : "Group"})

if __name__ == '__main__':
    app.run()