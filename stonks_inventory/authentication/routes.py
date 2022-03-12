from flask import Blueprint, Flask, flash, jsonify, redirect, request, url_for
from flask_cors import cross_origin
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, current_user, login_required

from stonks_inventory.models import Users

auth = Blueprint('auth', __name__, url_prefix='/auth')

@auth.route('/signup', methods = ['POST'])
def signup():
    data=request.get_json()

    username = data.get('username')
    db_user=Users.query.filter(Users.username == username).first()

    if db_user is not None:
        return jsonify({"message":f"{username} already exists."})

    else:
        new_user=Users(
            firstname=data.get('firstname'),
            lastname=data.get('lastname'),
            username=data.get('username'),
            email=data.get('email'),
            password=generate_password_hash(data.get('password'))
        )
        new_user.save()
        return jsonify({"message":"User created successfully"})

@auth.route('/signin', methods = ['POST'])
def signin():
    data=request.get_json()

    username=data.get('username')
    password=data.get('password')

    db_user = Users.query.filter(Users.username == username).first()

    if db_user and check_password_hash(db_user.password, password):
        login_user(db_user)
        return jsonify({"message":"Login successfully"})
    else:
        return jsonify({"message":"Username or Password is incorrect."})

@auth.route('/logout', methods = ['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message":"Logout successfully"})