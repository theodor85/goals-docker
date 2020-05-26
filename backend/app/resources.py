import logging

from flask_restful import Resource, reqparse

from app import db
from app.models import GoalModel


logger = logging.getLogger("main")

class Goals(Resource):
    
    def get(self):
        ''' Получение списка целей
        '''
        logger.warning("*********** Получение списка целей")
        goals_list = [{
            "name": goal.name,
            "target": goal.target,
            "current": goal.current,
        } for goal in GoalModel.query.all()]
        return goals_list, 200

    def post(self):
        ''' Создание новой цели
        '''
        logger.warning("*********** Создание новой цели")
        parser = reqparse.RequestParser()
        parser.add_argument("name")
        parser.add_argument("target")
        try:
            params = parser.parse_args()
        except Exception as e:
            return f"Error while parsing request: {e}", 400

        logger.warning(f'*********** {params}')
        logger.warning(f'*********** {params["name"]}, {params["name"]}')
        new_goal = GoalModel(name=params["name"], target=params["target"], current=0)
        try:
            db.session.add(new_goal)
            db.session.commit()
        except Exception as e:
            return "Saving to database error: {}".format(e), 400
        else:
            return "Goal was saved in database succesfully", 201
