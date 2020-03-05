from flask_restful import Resource, reqparse

from goals import GoalsList


class Goals(Resource):
    
    def get(self):
        ''' Получение списка целей
        '''
        return GoalsList, 200
