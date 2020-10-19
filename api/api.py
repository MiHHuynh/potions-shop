from datetime import date
import pprint
from flask import Flask, request, make_response
from flask_inputs import Inputs
from flask_inputs.validators import JsonSchema

from database import DATABASE

app = Flask(__name__)

order_schema = {
    "type": "object",
    "properties": {
        "firstName": {"type": "string"},
        "lastName": {"type": "string"},
        "email": {"type": "string"},
        "address": {
            "type": "object",
            "properties": {
                "street1": {"type": "string"},
                "street2": {"type": "string"},
                "city": {"type": "string"},
                "state": {"type": "string"},
                "zip": {"type": "string"},
            }
        },
        "phone": {"type": "string"},
        "quantity": {"type": "int"},
        "total": {"type": "string"}, # I think the total is better off as a float.
        "payment": {
            "type": "object",
            "properties": {
                "ccNum": "string",
                "exp": "string",
            }
        },
    }
}

class OrderInputs(Inputs):
    json = [JsonSchema(schema=order_schema)]

def validate_order(request):
    inputs = OrderInputs(request)
    if inputs.validate():
        return None
    else:
        return inputs.errors

# class Order():

#     def __init__(self):

#     id
#     first_name
#     last_name
#     email
#     street1
#     street2
#     city
#     state
#     zip
#     phone
#     credit_card_number
#     credit_card_expiration_date
#     quantity
#     total
#     order_date
#     fulfilled

def get_orders_this_month(email):
    # Assumption: A customer can only purchase 3 potions max per calendar month, whether in separate orders or within a single order.
    today = date.today()
    this_month = today.month
    this_year = today.year
    # Pseudocode: Order.objects.filter(email=email && order_date)
    orders_this_month = [order for order in DATABASE['Order'] if order['order_date'].month == this_month and order['order_date'].year == this_year]
    return orders_this_month

def get_total_purchased_potions(orders):
    return sum([order['quantity'] for order in orders])
    # TODO: make sure each quant is an int

@app.route('/')
def blah():
    return make_response({'id': 1}, 201)

@app.route('/api/magic', methods=['POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        # errors = validate_order(data) # TODO: Something breaking here
        # if errors is not None:
        #     return make_response({'error': errors}, 403) # TODO: 403?
        if not data:
            return make_response({'error': 'No data in POST body.'}, 400)
        order = {}
        if 'email' in data and 'quantity' in data:
            orders_this_month = get_orders_this_month(data['email'])
            total_potions_this_month = get_total_purchased_potions(orders_this_month)
            customer_can_place_order = (
                total_potions_this_month + data['quantity'] < 3
            )
            if not customer_can_place_order:
                return make_response({'error': 'Quantity exceeds maximum monthly order limit of 3'}, 403)
                # TODO: different error for too large of an order vs. max orders for month?
            order['email'] = data['email']
            order['quantity'] = data['quantity']
        if 'firstName' in data:
            order['first_name'] = data['firstName']
        if 'lastName' in data:
            order['last_name'] = data['lastName']
        if 'address' in data:
            order['address'] = data['address']
        if 'phone' in data:
            order['phone'] = data['phone']
        if 'payment' in data:
            order['payment'] = data['payment']
        
        # TODO: How to handle empty fields coming in?
        
        new_order = Order(**order) # TODO: The class handles UID
        # TODO: Implement Order class
        
        # add_to_database("Order", new_order) # TODO: This is supposed to be a db call.
        # TODO: Implement add_to_database

        # TODO: The following two can be set by the instance
        # order['order_date'] = date.today()
        # order['fulfilled'] = False # TODO: What determines whether or not an order has been fulfilled?
        # return make_response({"id": new_order.uid}, 201)
        return make_response(DATABASE, 200)
    pass

@app.route('/api/magic/<uid>', methods=['GET', 'PATCH', 'DELETE'])
def get_order(uid):
    if request.method == 'GET':
        order = get_from_database("Order", uid) # TODO: Implement get_from_database
        if not order:
            return make_response({"error": "Resource not found"}, 404)
        return make_response(order, 200)
    elif request.method == 'PATCH':
        # TODO: Move PATCH to /api/magic
        data = request.get_json()
        if not data:
            return make_response({'error': 'No data in POST body.'}, 400)
        if 'id' in data:
            order = get_from_database("Order", uid) # TODO: Implement get_from_database
            if not order:
                return make_response({"error": "Resource not found"}, 404)
            if 'fulfilled' in data:
                order['fulfilled'] = data['fulfilled'] # This is like updating a db entry
            return make_response("Resource updated successfully", 204)
        return make_response({'error': 'No order id in POST body.'}, 400)
    elif request.method == 'DELETE':
        # TODO: Implement delete
        pass
    pass


# TODO LIST:
"""
- Go through todos from above
- Unit tests for back end
- Make sure everything is working
- Setup proxy so client can call backend ?
- Redesign the fake db so that Order table is a dictionary, with uid being the key and the object being the value
- Write up Readme for API architecture and how to run it locally
- Research validation for client-side
- Calculation of total price
- Notifications for validation and order placed
- Research and be able to speak about any package and how things are done, tradeoffs, etc.
"""