from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS, cross_origin
from sqlalchemy import true

from config import Config
from .api.routes import api
from .authentication.routes import auth
from .models import db as root_db, login_manager, ma

app = Flask(__name__)
app.config.from_object(Config)

app.register_blueprint(api)
app.register_blueprint(auth)

root_db.init_app(app)
login_manager.init_app(app)
login_manager.login_view = 'auth.signin' # Specify the page rendered for non-Authed users
ma.init_app(app)
migrate = Migrate(app,root_db)

CORS(app) 
