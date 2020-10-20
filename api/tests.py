import pytest
import requests
from api import blah

def test_blah():
    response = requests.get('/')
    assert response.status_code == 200