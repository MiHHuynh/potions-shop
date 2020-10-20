import json
from datetime import date
from flask import Flask, request, make_response

from database import (
    DATABASE,
    create,
    get_orders_this_month_by_email, get_total_purchased_potions
)
from models import Order

app = Flask(__name__)

@app.route('/')
def index():
    return make_response("All systems are go!", 200)

@app.route('/api/magic', methods=['POST'])
def post_order():
    if request.method == 'POST':
        data = request.get_json()
        if not data:
            return make_response({'error': 'No data in POST body.'}, 400)

        order = {}
        if 'email' in data and 'quantity' in data:
            orders_this_month = get_orders_this_month_by_email(data['email'])
            total_potions_this_month = get_total_purchased_potions(orders_this_month)
            customer_can_place_order = (
                total_potions_this_month + data['quantity'] < 3
            )
            if not customer_can_place_order:
                return make_response({'error': 'Quantity exceeds maximum monthly order limit of 3'}, 403)
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
        if 'total' in data:
            order['total'] = data['total']
        
        try:
            new_order = Order(**order)
        except TypeError:
            return make_response({'error': 'Incomplete order request.'}, 400)

        created_order, created = create('Order', new_order)

        if not created:
            return make_response({"error": ''}, 201)    
        return make_response({"id": created_order.uid}, 201)

@app.route('/api/magic/<uid>', methods=['GET', 'PATCH', 'DELETE'])
def get_patch_delete_order(uid):
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