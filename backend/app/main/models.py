# Models will include at least…
# Two classes with primary keys at at least two attributes each
# [Optional but encouraged] One-to-many or many-to-many relationships between classes

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Movies(db.Model):

    __tablename__: 'movies'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(), nullable=False)
    release_date = db.Column(db.Date())
    actors = db.relationship('Actors', backref='movie',
                             cascade='all, delete-orphan',  lazy=True)

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def __init__(self, title):
        self.title = title

    def format(self):
        return {
            'id': self.id,
            'title': self.title,
            'release_date': self.release_date,
        }

    def details(self):
        return {
            'id': self.id,
            'title': self.title,
            'release_date': self.release_date
        }


class Actors(db.Model):
    __tablename__: 'actors'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(), nullable=False)
    age = db.Column(db.Integer(), nullable=True)
    gender = db.Column(db.String(), nullable=True)
    movie_id = db.Column(db.Integer, db.ForeignKey(
        'movies.id'), nullable=False)

    def insert(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self):
        db.session.commit()

    def __init__(self, name):
        self.name = name

    def format(self):
        return {
            'id': self.id,
            'name': self.name,
            'movie': self.movie.title,
        }

    def details(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'gender': self.gender,
            'movie': {
                'id': self.movie.id,
                'title': self.movie.title
            }
        }
