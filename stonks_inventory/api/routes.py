from decimal import Decimal
import json
from flask import Blueprint, jsonify, request
from flask_login import current_user
from sqlalchemy import func
from sqlalchemy.sql import label
from stonks_inventory.helpers import token_required
from stonks_inventory.models import Transaction, db, transaction_schema, transactions_schema, Users

api = Blueprint('api', __name__, url_prefix='/api')

class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)
        return json.JSONEncoder.default(self, obj)


# create transaction
@api.route('/transaction', methods=['POST'])
# @token_required
def create_transaction():
    ticker = request.json['ticker']
    transacted_price = request.json['transacted_price']
    transacted_shares = request.json['transacted_shares']
    transacted_investment = int(transacted_price) * int(transacted_shares)
    dates = request.json['dates']
    user_token = 'dac64136530c9c42a650ae91d9eabd05a169cff2ca3b0d04'

    transaction = Transaction(ticker, transacted_price, transacted_shares, transacted_investment, dates, user_token)

    db.session.add(transaction)
    db.session.commit()

    response = transaction_schema.dump(transaction)
    print(response)

    return jsonify(response)


# display portoflio data
@api.route('/portfolio', methods=['GET'])
# @token_required
def display_portfolio():
    results = Transaction.query.with_entities(
        Transaction.ticker,
        label('shares', func.sum(Transaction.transacted_shares)),
        label('avg_price', func.sum(Transaction.transacted_investment)/func.sum(Transaction.transacted_shares)),
        label('investment', func.sum(Transaction.transacted_investment))
    ).group_by(Transaction.ticker).all()


    return json.dumps([row._asdict() for row in results], cls=DecimalEncoder)



# retrieve all transaction
@api.route('/transaction', methods=['GET'])
# @token_required
def get_transactions():
    transaction = Transaction.query.all()
    response = transactions_schema.dump(transaction)
    return jsonify(response)

# retrieve a transaction
@api.route('/transaction/<id>', methods=['GET'])
# @token_required
def get_transaction(id):
    transaction = Transaction.query.get(id)
    response = transaction_schema(transaction)
    return jsonify(response)

# update a transaction
@api.route('/transaction/<id>', methods=['POST','PUT'])
# @token_required
def update_transaction(id):
    transaction = Transaction.query.get(id)
    transaction.ticker = request.json['ticker']
    transaction.transacted_price = request.json['transacted_price']
    transaction.transacted_shares = request.json['transacted_shares']
    transaction.dates = request.json['dates']

# delete a transaction
@api.route('/transaction/<id>', methods = ['DELETE'])
# @token_required
def delete_transaction(id):
    transaction = Transaction.query.get(id)
    db.session.delete(transaction)
    db.session.commit()

    response = transaction_schema(transaction)
    return jsonify(response)

