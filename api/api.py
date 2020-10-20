import json
from datetime import date
from flask import Flask, request, make_response

from database import (
    DATABASE,
    create,
    delete_by_uid,
    get_from_database_by_uid,
    get_orders_this_month_by_email,
    get_total_purchased_potions
)
from models import Order

app = Flask(__name__)

@app.route('/')
def index():
    return make_response('All systems are go!', 200)

@app.route('/api/magic', methods=['POST', 'PATCH'])
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
            return make_response({'error': 'Unable to create order.'}, 503)
        return make_response({'id': created_order.id}, 201)
    if request.method == 'PATCH':
        """
        After some research, it seems that making a PATCH request to /api/magic with no uid is understood to be a PATCH on multiple resources, with the payload containing the change to be made and an order of operations to specify which resources. Although the specs say to make a PATCH route to /api/magic, I opted to put it under /api/magic/<uid> because the use will be for single resources, implied/assumed from the payload specifications.
        """
        pass

@app.route('/api/magic/<uid>', methods=['GET', 'PATCH', 'DELETE'])
def get_patch_delete_order(uid):
    if request.method == 'GET':
        order = get_from_database_by_uid('Order', uid)
        if not order:
            return make_response({'error': 'Resource not found.'}, 404)
        return make_response(_shape_order(order[0]), 200)
    elif request.method == 'PATCH':
        data = request.get_json()
        if not data:
            return make_response({'error': 'No data in POST body.'}, 400)
        order = get_from_database_by_uid('Order', uid)
        if not order:
            return make_response({'error': 'Resource not found'}, 404)
        if 'fulfilled' in data:
            order[0]['fulfilled'] = data['fulfilled'] # This would typically be a db update.
            return make_response('Resource updated successfully', 204)
    elif request.method == 'DELETE':
        _, deleted = delete_by_uid('Order', uid)
        if deleted:
            return make_response({'Resource deleted successfully'}, 204)
        return make_response({'error': 'Resource not found.'}, 404)

def _shape_order(order):
    return {
        'firstName': order.first_name,
        'lastName': order.last_name,
        'email': order.email,
        'address': order.address,
        'phone': order.phone,
        'payment': order.payment,
        'quantity': order.quantity,
        'total': order.total,
        'orderDate': order.order_date,
        'fulfilled': order.fulfilled
    }