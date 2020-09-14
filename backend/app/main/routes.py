# Endpoints will include at least…
# [X] Two GET requests
# [X] One POST request
# [X] PATCH request
# [X] DELETE request

from os import environ
from flask import Blueprint, render_template, jsonify, abort, request, session
from flask_cors import CORS, cross_origin
from .models import Actors, Movies
from sqlalchemy import desc
from app.auth.auth import requires_auth
import json

main = Blueprint('main', __name__)

CORS(main, resources={r"/*": {"origins": "*"}})


@main.route('/', methods=['GET'])
def index():
    if 'profile' in session:
        return render_template('index.html',
                               userinfo=session['profile'],
                               indent=4,
                               app_location=environ.get('APP_LOCATION'))
    return render_template('index.html')


@main.route('/movies', methods=['GET'])
@requires_auth('get:movies')
def get_movies(payload):
    try:
        query = Movies.query.order_by(desc(Movies.id)).all()
        if len(query) < 0:
            abort(404)
        movies = [movie.format() for movie in query]
        return jsonify({
            'success': True,
            'movies': movies
        })
    except:
        abort(400)


@main.route('/movies/<int:movie_id>', methods=['GET'])
@requires_auth('get:movies')
def get_movie_detail(payload, movie_id):
    try:
        query = Movies.query.filter(Movies.id == movie_id).one_or_none()
        if query is None:
            abort(404)
        movie = query.details()
        movie['actors'] = [actor.details() for actor in query.actors]
        return jsonify({
            'success': True,
            'movies': movie
        })
    except:
        abort(400)


@main.route('/movies', methods=['POST'])
@requires_auth('add:movie')
def add_movie(payload):
    user_input = request.get_json()
    if 'title' not in user_input:
        abort(400)
    if 'release_date' not in user_input:
        abort(400)
    req_title = user_input['title']
    req_release_date = user_input['release_date']
    try:
        new_movie = Movies(title=req_title)
        new_movie.release_date = user_input['release_date']
        new_movie.insert()
        query = Movies.query.order_by(desc(Movies.id)).all()
        movies = [movie.format() for movie in query]
        return jsonify({
            'success': True,
            'movies': movies
        })
    except:
        abort(400)


@main.route('/movies/<int:movie_id>', methods=['DELETE'])
@requires_auth('delete:movie')
def delete_movie(payload, movie_id):
    try:
        query = Movies.query.filter(Movies.id == movie_id).one_or_none()
        if query is None:
            abort(404)
        query.delete()
        return jsonify({
            'success': True,
            'delete': movie_id
        })
    except:
        abort(400)


@main.route('/movies/<int:movie_id>', methods=['PATCH'])
@requires_auth('modify:movies')
def update_movie(payload, movie_id):
    user_input = request.get_json()
    try:
        movie = Movies.query.filter(Movies.id == movie_id).one_or_none()
        if movie is None:
            abort(404)
        if 'title' not in user_input:
            abort(400)
        movie.title = user_input['title']
        if 'release_date' not in user_input:
            abort(400)
        movie.release_date = user_input['release_date']
        movie.update()
        return jsonify({
            'success': True,
            'movies': [movie.format()]
        })
    except:
        abort(400)


@main.route('/actors', methods=['GET'])
@requires_auth('get:actors')
def get_actors(payload):
    try:
        query = Actors.query.order_by(desc(Actors.id)).all()
        if len(query) < 0:
            abort(404)
        actors = [actor.format() for actor in query]
        return jsonify({
            'success': True,
            'actors': actors
        })
    except:
        abort(400)


@main.route('/actors/<int:actor_id>', methods=['GET'])
@requires_auth('get:actors')
def get_actor_details(payload, actor_id):
    try:
        query = Actors.query.filter(Actors.id == actor_id).one_or_none()
        if query is None:
            abort(404)
        actor = query.details()
        # actor['movie'] = [ movie.format() for movie in query.movie]
        return jsonify({
            'success': True,
            'actors': actor
        })
    except:
        abort(400)


@main.route('/actors', methods=['POST'])
@requires_auth('add:actor')
def add_actor(payload):
    user_input = request.get_json()
    try:
        if 'name' not in user_input:
            abort(400)
        if 'age' not in user_input:
            abort(400)
        if 'gender' not in user_input:
            abort(400)
        if 'movie_id' not in user_input:
            abort(400)
        new_actor = Actors(name=user_input['name'])
        new_actor.age = user_input['age']
        new_actor.gender = user_input['gender']
        new_actor.movie_id = user_input['movie_id']
        new_actor.insert()
        query = Actors.query.order_by(desc(Actors.id)).all()
        actors = [actor.format() for actor in query]
        return jsonify({
            'success': True,
            'actors': actors
        })
    except:
        abort(400)


@main.route('/actors/<int:movie_id>/movie', methods=['POST'])
@requires_auth('add:actor')
def add_actor_return_movies(payload, movie_id):
    user_input = request.get_json()
    try:
        if 'name' not in user_input:
            abort(400)
        if 'age' not in user_input:
            abort(400)
        if 'gender' not in user_input:
            abort(400)
        new_actor = Actors(name=user_input['name'])
        new_actor.age = user_input['age']
        new_actor.gender = user_input['gender']
        new_actor.movie_id = movie_id
        new_actor.insert()
        query = Actors.query.filter(
            Actors.movie_id == movie_id).order_by(desc(Actors.id)).all()
        actors = [actor.details() for actor in query]
        return jsonify({
            'success': True,
            'actors': actors
        })
    except:
        abort(400)


@main.route('/actors/<int:actor_id>', methods=['DELETE'])
@requires_auth('delete:actor')
def delete_actor(payload, actor_id):
    try:
        actor = Actors.query.filter(Actors.id == actor_id).one_or_none()
        if actor is None:
            abort(404)
        actor.delete()
        return jsonify({
            'success': True,
            'delete': actor_id
        })
    except:
        abort(400)


@main.route('/actors/<int:actor_id>', methods=['PATCH'])
@requires_auth('modify:actors')
def update_actor(payload, actor_id):
    new_info = request.get_json()
    try:
        actor = Actors.query.filter(Actors.id == actor_id).one_or_none()
        if actor is None:
            abort(400)
        if 'name' not in new_info:
            abort(400)
        if 'age' not in new_info:
            abort(400)
        if 'gender' not in new_info:
            abort(400)
        if 'movie_id' not in new_info:
            abort(400)
        actor.name = new_info['name']
        actor.age = new_info['age']
        actor.gender = new_info['gender']
        actor.movie_id = new_info['movie_id']
        actor.update()
        return jsonify({
            'success': True,
            'actors': actor.format()
        })
    except:
        abort(400)
