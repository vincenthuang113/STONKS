from datetime import date, datetime
from enum import unique
import inspect
from operator import inv
import uuid
import flask_marshmallow
import secrets


from flask_login import LoginManager, UserMixin
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import ForeignKey
from flask_serialize import FlaskSerialize


db = SQLAlchemy()
ma = Marshmallow()
login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return Users.query.get(user_id)


# transaction
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key = True, autoincrement=True)
    ticker = db.Column(db.String(5), nullable=False)
    transacted_price = db.Column(db.Numeric(precision=7, scale=2), nullable=False)
    transacted_shares = db.Column(db.Numeric(precision=12, scale=2), nullable=False)
    transacted_investment = db.Column(db.Numeric(precision=16, scale=2), nullable=False)
    dates = db.Column(db.DateTime, nullable=False)
    user_token = db.Column(db.String, db.ForeignKey('users.token'), nullable = False)
    

    def __init__(self, ticker, transacted_price, transacted_shares, transacted_investment, dates, user_token):
        self.ticker = ticker
        self.transacted_price = transacted_price
        self.transacted_shares = transacted_shares
        self.transacted_investment = transacted_investment
        self.dates = dates
        self.user_token = user_token


class TransactionSchema(ma.Schema):
    class Meta:
        fields = ['ticker', 'transacted_price', 'transacted_shares', 'transacted_investment', 'dates', 'id']

transaction_schema = TransactionSchema()
transactions_schema = TransactionSchema(many=True)


class Users(db.Model, UserMixin):
    id = db.Column(db.String, primary_key=True)
    firstname = db.Column(db.String(), nullable=True)
    lastname=db.Column(db.String(), nullable=True)
    username=db.Column(db.String(25), nullable=False,unique=True)
    email=db.Column(db.String(80), nullable=False)
    password = db.Column(db.Text(), nullable=False)
    g_auth_verify = db.Column(db.Boolean, default = False)
    token = db.Column(db.String, default = '', unique = True)
    date_created = db.Column(db.DateTime, nullable = False, default = datetime.utcnow)
    transaction = db.relationship('Transaction', backref = 'owner', lazy = True)

    def __init__(self, email, id='',firstname = '', lastname = '', username = '', password = '', token = '', g_auth_verify=False):
        self.id = self.set_id()
        self.firstname = firstname
        self.lastname = lastname
        self.username = username
        self.email = email
        self.password = password
        self.token = self.set_token(24)
        self.g_auth_verify = g_auth_verify
    
    def set_id(self):
        return str(uuid.uuid4())

    def set_token(self, length):
        return secrets.token_hex(length)

    def __repr__(self):
        return f'User {self.username} has been added to the database'

    def save(self):
        db.session.add(self)
        db.session.commit()

            
# company info
# class Overview(db.Model):
#     ticker = db.Column(db.String, primary_key=True)
#     asset_type = db.Column(db.String(20))
#     company = db.Column(db.String(100))
#     description = db.Column(db.String(500))
#     exchange = db.Column(db.String(6))
#     country = db.Column(db.String(10))
#     sector = db.Column(db.String(20))
#     industry = db.Column(db.String(50))
#     fiscal_year_end = db.Column(db.String(10))
#     marketcap = db.Column(db.Numeric(precision=20))
#     ebitda = db.Column(db.Numeric(precision=20))
#     pe_ratio = db.Column(db.Numeric(precision=6, scale=2))
#     peg_ratio = db.Column(db.Numeric(precision=6, scale=3))
#     bookvalue = db.Column(db.Numeric(precision=6, scale=2))
#     dividend_per_share = db.Column(db.Numeric(precision=5, scale=2))
#     dividend_yield = db.Column(db.Numeric(precision=6, scale=3))
#     eps = db.Column(db.Numeric(precision=6, scale=2))
#     profit_margin = db.Column(db.Numeric(precision=5, scale=1))
#     operating_margin = db.Column(db.Numeric(precision=7, scale=3))
#     roa = db.Column(db.Numeric(precision=10, scale=4))
#     roe = db.Column(db.Numeric(precision=10, scale=3))
#     price_book = db.Column(db.Numeric(precision=5, scale=2))
#     quarterly_earning_yoy = db.Column(db.Numeric(precision=6, scale=3))
#     quarterly_revenue_yoy = db.Column(db.Numeric(precision=6, scale=3))
#     analyst_target_price =  db.Column(db.Numeric(precision=10, scale=2))
#     forward_pe = db.Column(db.Numeric(precision=6, scale=2))
#     beta =  db.Column(db.Numeric(precision=6, scale=3))
#     fiftytwo_high =  db.Column(db.Numeric(precision=10, scale=2))
#     fiftytwo_low =  db.Column(db.Numeric(precision=10, scale=2))
#     shares_outstanding = db.Column(db.Numeric(precision=20))
    

#     def __init__(self, ticker, asset_type, company, description, exchange, country, sector, industry, fiscal_year_end, marketcap, ebitda, pe_ratio, peg_ratio, bookvalue, 
#                     dividend_per_share, dividend_yield, eps, profit_margin, operating_margin, roa, roe, price_book, quarterly_earning_yoy, quarterly_revenue_yoy, 
#                     analyst_target_price, forward_pe, beta, fiftytwo_high, fiftytwo_low, shares_oustanding):
#         self.ticker = ticker
#         self.asset_type = asset_type
#         self.company = company
#         self.description = description
#         self.exchange = exchange
#         self.country = country
#         self.sector = sector
#         self.industry = industry
#         self.fiscal_year_end = fiscal_year_end
#         self.marketcap = marketcap
#         self.ebitda = ebitda
#         self.pe_ratio = pe_ratio
#         self.peg_ratio = peg_ratio
#         self.bookvalue = bookvalue
#         self.dividend_per_share = dividend_per_share
#         self.dividend_yield = dividend_yield
#         self.eps = eps
#         self.profit_margin = profit_margin
#         self.operating_margin = operating_margin
#         self.roa = roa 
#         self.roe = roe
#         self.price_book = price_book
#         self.quarterly_earning_yoy = quarterly_earning_yoy
#         self.quarterly_revenue_yoy = quarterly_revenue_yoy
#         self.analyst_target_price = analyst_target_price
#         self.forward_pe = forward_pe
#         self.beta = beta
#         self.fiftytwo_high = fiftytwo_high
#         self.fiftytwo_low = fiftytwo_low
#         self.shares_outstanding = shares_oustanding

# class OverviewSchema(ma.Schema):
#     class Meta:
#         fields = ['ticker', 'asset_type', 'company', 'description', 'exchange', 'country', 'sector', 'industry', 'fiscal_year_end', 'marketcap', 'ebitda', 'pe_ratio', 'peg_ratio', 'bookvalue', 
#                     'dividend_per_share', 'dividend_yield', 'eps', 'profit_margin', 'operating_margin', 'roa', 'roe', 'price_book', 'quarterly_earning_yoy', 'quarterly_revenue_yoy', 
#                     'analyst_target_price', 'forward_pe', 'beta', 'fiftytwo_high', 'fiftytwo_low', 'shares_oustanding']

# overview_schema = OverviewSchema()
# overviews_schema = OverviewSchema(many=True)