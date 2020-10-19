import React, { useEffect, useState } from 'react';
import BillingInformation from './BillingInformation';
import OrderGoods from './OrderGoods';
import SubmitOrderButton from './SubmitOrderButton';

const OrderForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street1, setStreet1] = useState('');
  const [street2, setStreet2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0); // Specs want this as a string
  const [ccNum, setCcNum] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const [goodsSectionReady, setGoodsSectionReady] = useState(false);
  const [billingInfoReady, setBillingInfoReady] = useState(true);

  const handleSubmit = event => {
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
        'ccNum': ccNum,
        'exp': expirationDate
      }
    };
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(postData)
    // };
    // // const response = await fetch('/api/magic', requestOptions); // TODO: set up proxy
    // // const data = await response.json();
    // // this.setState({postId: data.id});
    // console.log(requestOptions);
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
        ccNum={ccNum}
        setCcNum={setCcNum}
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