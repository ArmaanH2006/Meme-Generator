from flask import Flask
import requests
from flask import jsonify

app = Flask(__name__)



def home():
    return "hi"

#retrives the data from the user
def get_data():
    return "Hello"

#returns an error method
@app.errorhandler(404)
def not_found(e):
    return jsonify(error ="error not found "),404


@app.route('/api/get_meme',methods = ['GET'])
def get_meme():
    url_api = "https://imgflip.com/api/get_memes"
    response = requests.get(url_api)
    print(response)
    return "Hello"

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000, debug = True)


#learn about python flask and write more than just the get method watch youtube


