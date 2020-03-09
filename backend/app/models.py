from app import db


class GoalModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(256), index=True, unique=True)
    target = db.Column(db.Integer)
    current = db.Column(db.Integer)

    def __repr__(self):
        return '<Goal {}; {}/{}>'.format(self.name, self.current, self.target)
