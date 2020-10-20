DATABASE = {
    'Order': []
}

def create(table, entry):
    DATABASE[table].append(entry)
    return (entry, True)

def get_orders_this_month_by_email(email):
    # Assumption: A customer can only purchase 3 potions max per calendar month, whether in separate orders or within a single order.
    # Ideally, this would be a filter query provided for by an ORM.
    # Pseudocode if there were an ORM: Order.objects.filter(email=email && order_date.month=this_month && order_date.year=this.year)

    today = date.today()
    this_month = today.month
    this_year = today.year
    orders_this_month = [
        order for order in DATABASE['Order']
        if (
            order['order_date'].month == this_month and
            order['order_date'].year == this_year and
            order['email'] == email
        )
    ]
    return orders_this_month

def get_total_purchased_potions(orders):
    # Ideally, this would be a db query and count provided for by an ORM.
    return sum([order['quantity'] for order in orders])