from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api
from flask_cors import CORS

from config import Config

# config
app = Flask(__name__)
app.config.from_object(Config)

# DB
db = SQLAlchemy(app)
migrate = Migrate(app, db)

from app.models import GoalModel
from app.resources import Goals

# API
CORS(app)
api = Api(app)
api.add_resource(Goals, "/goals")


