from uuid import uuid4
from datetime import date

now = date.today()

"""
Ideally, if this were a proper model layer, there would be type validation on each field and ability to designate fields as required or not.
"""

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
      self.order_date = now
      self.fulfilled = False