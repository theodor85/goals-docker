from flask import Flask
from flask_restful import Api

from resources import Quote


app = Flask(__name__)
api = Api(app)
api.add_resource(Quote, "/ai-quotes", "/ai-quotes/", "/ai-quotes/<int:id>")


@app.route('/')
def index():
    return 'Index Page'

@app.route('/hello')
def hello():
    return 'Hello, World'
