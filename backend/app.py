from flask import Flask

# FIXME - importing classes from /backend/functions
import OFFInterface from 'functions/OFFInterface'

app = Flask(__name__)

@app.route('/')
def home():
    return True

if __name__ == '__main__':
    app.run()