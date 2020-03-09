from flask_restful import Resource, reqparse

from app.models import GoalModel


class Goals(Resource):
    
    def get(self):
        ''' Получение списка целей
        '''
        goals_list = [{
            "name": goal.name,
            "target": goal.target,
            "current": goal.current,
        } for goal in GoalModel.query.all()]
        return goals_list, 200
