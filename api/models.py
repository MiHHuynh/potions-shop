from uuid import uuid4
from datetime import date

class Order(object):
    def __init__(self, first_name, last_name, email, address, phone, payment, quantity, total):
      self.id = uuid4().hex
      self.first_name = first_name
      self.last_name = last_name
      self.email = email
      self.address = address
      self.phone = phone
      self.payment = payment
      self.quantity = quantity
      self.total = total
      self.order_date = date.today()
      self.fulfilled = False