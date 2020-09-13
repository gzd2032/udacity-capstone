# used blueprint format from https://flask.palletsprojects.com/en/0.12.x/blueprints/#my-first-blueprint 
# and https://www.youtube.com/watch?v=Wfx4YBzg16s&t=1631s
# used db.create_all format from https://hackersandslackers.com/flask-sqlalchemy-database-models/ 
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from flask_migrate import Migrate
from .main.models import db
from .main.routes import main
from .auth.auth import oauth
from .auth.routes import auth
from .config import Auth_config
from .errors.handlers import errors

migrate = Migrate()


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)
    app.secret_key = Auth_config.AUTH0_CLIENT_SECRET
    db.init_app(app)
    migrate.init_app(app, db)
    oauth.init_app(app)
    with app.app_context():
        db.create_all()
    
    app.register_blueprint(main)
    app.register_blueprint(auth)
    app.register_blueprint(errors)


    return app