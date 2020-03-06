from flask import Flask
from flask_restful import Api
from flask_cors import CORS

from resources import Goals

app = Flask(__name__)
CORS(app)

api = Api(app)
api.add_resource(Goals, "/goals")


@app.route("/")
def hello():
    return "HEllo world"
