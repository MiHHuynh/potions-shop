import React, { useEffect, useState } from 'react';
import BillingInformation from './BillingInformation';
import OrderGoods from './OrderGoods';
import SubmitOrderButton from './SubmitOrderButton';

const OrderForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    quantity: 0,
    total: 0,
    creditCardNumber: '',
    expirationDate: ''
  }
  const [firstName, setFirstName] = useState(initialValues.firstName);
  const [lastName, setLastName] = useState(initialValues.lastName);
  const [email, setEmail] = useState(initialValues.email);
  const [street1, setStreet1] = useState(initialValues.street1);
  const [street2, setStreet2] = useState(initialValues.street2);
  const [city, setCity] = useState(initialValues.city);
  const [state, setState] = useState(initialValues.state);
  const [zip, setZip] = useState(initialValues.zip);
  const [phone, setPhone] = useState(initialValues.phone);
  const [quantity, setQuantity] = useState(initialValues.quantity);
  const [total, setTotal] = useState(initialValues.total); // Specs want this as a string
  const [creditCardNumber, setCreditCardNumber] = useState(initialValues.creditCardNumber);
  const [expirationDate, setExpirationDate] = useState(initialValues.expirationDate);
  const [goodsSectionReady, setGoodsSectionReady] = useState(false);
  const [billingInfoReady, setBillingInfoReady] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submitted");

    const postData = {
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'address': {
        'street1': street1,
        'street2': street2,
        'city': city,
        'state': state,
        'zip': zip
      },
      'phone': phone,
      'quantity': quantity,
      'total': total,
      'payment': {
        'ccNum': creditCardNumber,
        'exp': expirationDate
      }
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    };
    const response = await fetch('/api/magic', requestOptions); // TODO: set up proxy
    const data = await response.json();
    // this.setState({postId: data.id});
    console.log(requestOptions);
    console.log('data', data);
    if (goodsSectionReady && billingInfoReady) {
      console.log("both sections ready to submit");
    }
    console.log(postData)
  }

  return (
    <form onSubmit={handleSubmit}>
      <OrderGoods
        quantity={quantity}
        setQuantity={setQuantity}
        total={total}
        setTotal={setTotal}
        canSubmit={goodsSectionReady}
        setCanSubmit={setGoodsSectionReady}
      />
      <BillingInformation
        initialValues={initialValues}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        street1={street1}
        setStreet1={setStreet1}
        street2={street2}
        setStreet2={setStreet2}
        city={city}
        setCity={setCity}
        state={state}
        setState={setState}
        zip={zip}
        setZip={setZip}
        phone={phone}
        setPhone={setPhone}
        creditCardNumber={creditCardNumber}
        setCreditCardNumber={setCreditCardNumber}
        expirationDate={expirationDate}
        setExpirationDate={setExpirationDate}
        canSubmit={billingInfoReady}
        setCanSubmit={setBillingInfoReady}
      />
      <SubmitOrderButton canSubmit={goodsSectionReady && billingInfoReady} />
    </form>
  );
}

export default OrderForm;