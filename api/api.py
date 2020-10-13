import time
import pprint
from flask import Flask, request, make_response

app = Flask(__name__)

# def validate_


@app.route('/')
def blah():
    return make_response({'id': 1}, 201)

@app.route('/api/magic', methods=['POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return make_response({'error': 'No data in POST body.'})
        order = []
        if 'firstName' in data:

        # Check fields - verifying US addresses/phone vs. international
        # Parse out user information
            # firstName
            # lastName
            # email
            # address
                # street1 
                # street2
                # city
                # state
                # zip
            # phone
            # payment
                # ccNum
                # exp
            #### NOTE: Ideally addresses and payment would be their own tables in case a customer has more than one address and more than one payment option.
        # Get or create user entry
        # Query for all orders in which orderDate is within month (or within 30 days?) in which user is user
        # Count number of orders
        # If == 3, return 405 method not allowed / 403 forbidden
        # If < 3,
        # Parse order information
            # quantity
            # total
            # orderDate
            # fulfilled - bool
        # Create new order entry
        return make_response(request.data, 200)
    pass

@app.route('/api/magic/<uid>', methods=['GET', 'PATCH', 'DELETE'])
def get_order():
    if request.method == 'GET':
        pass
    elif request.method == 'PATCH':
        pass
    elif request.method == 'DELETE':
        pass
    # GET
    # PATCH
    # DELETE
    pass