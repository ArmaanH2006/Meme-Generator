from urllib import response
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import random

app = Flask(__name__)
CORS(app)
@app.route('/')
def home():
    return "hi"

#returns an error method
@app.errorhandler(404)
def not_found(e):
    return jsonify(error ="error not found "),404


@app.route('/api/get_meme',methods = ['GET'])
def get_meme():
    url_api = "https://api.imgflip.com/get_memes"
    response = requests.get(url_api)

    data = response.json()
    
    if data.get('success') == True:
        memes = data.get('data', {}).get('memes', [])
        if memes:
            print(memes)
            return jsonify(memes)
        else:
            return jsonify(error="No memes found"), 404

    # try:
    #     data = response.json()
    #     return jsonify(data)
    # except requests.exceptions.RequestException as e:
    #     print(e)
    return "Hello"

@app.route('/api/return_meme',methods = ['GET'])
def return_meme():
    url_api = "https://api.imgflip.com/get_memes"
    response = requests.get(url_api)

    data = response.json()
    
    if data.get('success') == True:
        memes = data.get('data', {}).get('memes', [])
        if memes:
            random_meme = random.choice(memes)
            return jsonify(random_meme)
        else:
            return jsonify(error="No memes found"), 404

    return "Hello"


@app.route('/api/caption_image',methods = ['POST'])
def caption_image():

    url_api = "https://api.imgflip.com/caption_image"
    data = request.get_json()

    template_id = data.get('template_id')
    text0 = data.get('text0')
    text1 = data.get('text1')
    username = "vsmith3390"
    password = "Herricks2#"


    payload = {
        "template_id": template_id,
        "text0": text0,
        "text1": text1,

        "username": username,
        "password": password
    }

    response = requests.post(url_api,data = payload)


    return jsonify(response.json())






if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000, debug = True)


#learn about python flask and write more than just the get method watch youtube


