import React, { useState } from 'react';
import { isValidText, isValidEmail, isValidPhoneNumber, isValidAddress, isValidZipCode, isValidCreditCardNumber, isValidExpirationDate } from './validators';

const BillingInformation = ({
  initialValues,
  firstName,
  lastName,
  email,
  street1,
  street2,
  city,
  state,
  zip,
  phone,
  creditCardNumber,
  expirationDate,
  setFirstName,
  setLastName,
  setEmail,
  setStreet1,
  setStreet2,
  setCity,
  setState,
  setZip,
  setPhone,
  setCreditCardNumber,
  setExpirationDate,
  canSubmit,
  setCanSubmit
}) => {
  const [showFirstNameError, setShowFirstNameError] = useState(false);
  const [showLastNameError, setShowLastNameError] = useState(false);
  const [showStreet1Error, setShowStreet1Error] = useState(false);
  const [showCityError, setShowCityError] = useState(false);
  const [showStateError, setShowStateError] = useState(false);
  const [showZipError, setShowZipError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPhoneNumberError, setShowPhoneNumberError] = useState(false);
  const [showCreditCardNumberError, setShowCreditCardNumberError] = useState(false);
  const [showExpirationDateError, setShowExpirationDateError] = useState(false);

  const areAllFieldsTouched = () => {
    if (
      initialValues.firstName !== firstName &&
      initialValues.lastName !== lastName &&
      initialValues.email !== email &&
      initialValues.street1 !== street1 &&
      initialValues.city !== city &&
      initialValues.state !== state &&
      initialValues.zip !== zip &&
      initialValues.phone !== phone &&
      initialValues.creditCardNumber !== creditCardNumber &&
      initialValues.expirationDate !== expirationDate
    ) {
      return true;
    }
    return false;
  }

  const noErrors = () => {
    if (
      !showFirstNameError &&
      !showLastNameError &&
      !showStreet1Error &&
      !showCityError &&
      !showStateError &&
      !showZipError &&
      !showEmailError &&
      !showPhoneNumberError &&
      !showCreditCardNumberError &&
      !showExpirationDateError
    ) {
      return true;
    }
    return false;
  }

  const readyToSubmit = () => {
    return (areAllFieldsTouched() && noErrors());
  }

  const handleChangeFirstName = (event) => {
    if (canSubmit) setCanSubmit(false);
    setFirstName(event.target.value);
    if (event.target.value && !isValidText(event.target.value)) {
      if (!showFirstNameError) setShowFirstNameError(true);
    }
    else {
      if (showFirstNameError) setShowFirstNameError(false);
      setFirstName(event.target.value);
    }
  }

  const handleBlurFirstName = (event) => {
    if (!event.target.value || !isValidText(event.target.value)) {
      if (!showFirstNameError) setShowFirstNameError(true);
    }
    else {
      if (showFirstNameError) setShowFirstNameError(false);
      setFirstName(event.target.value);
      if (readyToSubmit()) setCanSubmit(true);
    }
  }
  
  const handleChangeLastName = (event) => {
    if (canSubmit) setCanSubmit(false);
    setLastName(event.target.value);
    if (event.target.value && !isValidText(event.target.value)) {
      if (!showLastNameError) setShowLastNameError(true);
    }
    else {
      if (showLastNameError) setShowLastNameError(false);
      setLastName(event.target.value);
    }
  }
  
  const handleBlurLastName = (event) => {
    if (!event.target.value || !isValidText(event.target.value)) {
      if (!showLastNameError) setShowLastNameError(true);
    }
    else {
      if (showLastNameError) setShowLastNameError(false);
      setLastName(event.target.value);
      if (readyToSubmit()) setCanSubmit(true);
    }
  }

  const handleChangeStreet1 = (event) => {
    if (canSubmit) setCanSubmit(false);
    setStreet1(event.target.value);
    if (event.target.value && !isValidAddress(event.target.value)) {
      if (!showStreet1Error) setShowStreet1Error(true);
    }
    else {
      if (showStreet1Error) setShowStreet1Error(false);
      setStreet1(event.target.value);
    }
  }

  const handleBlurStreet1 = (event) => {
    if (!event.target.value || !isValidAddress(event.target.value)) {
      if (!showStreet1Error) setShowStreet1Error(true);
    }
    else {
      if (showStreet1Error) setShowStreet1Error(false);
      setStreet1(event.target.value);
      if (readyToSubmit()) setCanSubmit(true);
    }
  }

  const handleChangeStreet2 = (event) => {
    setStreet2(event.target.value);
  }

  const handleBlurStreet2 = (event) => {
    if (event.target.value) {
      setStreet2(event.target.value);
    }
  }
  
  const handleChangeCity = (event) => {
    if (canSubmit) setCanSubmit(false);
    setCity(event.target.value);
    if (event.target.value && !isValidText(event.target.value)) {
      if (!showCityError) setShowCityError(true);
    }
    else {
      if (showCityError) setShowCityError(false);
      setCity(event.target.value);
    }
  }
  
  const handleBlurCity = (event) => {
    if (!event.target.value || !isValidText(event.target.value)) {
      if (!showCityError) setShowCityError(true);
    }
    else {
      if (showCityError) setShowCityError(false);
      setCity(event.target.value);
      if (readyToSubmit()) setCanSubmit(true);
    }
  }

  const handleChangeState = (event) => {
    setState(event.target.value);
  }
  
  const handleBlurState = (event) => {
    if (!event.target.value) {
      if (!showStateError) setShowStateError(true);
    }
    else {
      if (showStateError) setShowStateError(false);
      setState(event.target.value);
      if (readyToSubmit()) setCanSubmit(true);
    }
  }

  const handleChangeZip = (event) => {
    if (canSubmit) setCanSubmit(false);
    setZip(event.target.value);
    if (!event.target.value || !isValidZipCode(event.target.value)) {
      if (!showZipError) setShowZipError(true);
    }
    else {
      if (showZipError) setShowZipError(false);
      setZip(event.target.value);
    }
  }
  
  const handleBlurZip = (event) => {
    if (!event.target.value || !isValidZipCode(event.target.value)) {
      if (!showZipError) setShowZipError(true);
    }
    else {
      if (showZipError) setShowZipError(false);
      setZip(event.target.value);
      if (readyToSubmit()) setCanSubmit(true);
    }
  }

  const handleChangeEmail = (event) => {
    if (canSubmit) setCanSubmit(false);
    setEmail(event.target.value);
    if (!event.target.value || !isValidEmail(event.target.value)) {
      if (!showEmailError) setShowEmailError(true);
    }
    else {
      if (showEmailError) setShowEmailError(false);
      setEmail(event.target.value);
    }
  }
  
  const handleBlurEmail = (event) => {
    if (!event.target.value || !isValidEmail(event.target.value)) {
      if (!showEmailError) setShowEmailError(true);
    }
    else {
      if (showEmailError) setShowEmailError(false);
      setEmail(event.target.value);
      if (readyToSubmit()) setCanSubmit(true);
    }
  }

  const handleChangePhone = (event) => {
    if (canSubmit) setCanSubmit(false);
    setPhone(event.target.value);
    if (!event.target.value || !isValidPhoneNumber(event.target.value)) {
      if (!showPhoneNumberError) setShowPhoneNumberError(true);
    }
    else {
      if (showPhoneNumberError) setShowPhoneNumberError(false);
      setPhone(event.target.value);
    }
  }
  
  const handleBlurPhone = (event) => {
    if (!event.target.value || !isValidPhoneNumber(event.target.value)) {
      if (!showPhoneNumberError) setShowPhoneNumberError(true);
    }
    else {
      if (showPhoneNumberError) setShowPhoneNumberError(false);
      setPhone(event.target.value);
      if (readyToSubmit()) setCanSubmit(true);
    }
  }

  const handleChangeCreditCardNumber = (event) => {
    if (canSubmit) setCanSubmit(false);
    setCreditCardNumber(event.target.value);
    if (!event.target.value || !isValidCreditCardNumber(event.target.value)) {
      if (!showCreditCardNumberError) setShowCreditCardNumberError(true);
    }
    else {
      if (showCreditCardNumberError) setShowCreditCardNumberError(false);
      setCreditCardNumber(event.target.value);
    }
  }

  const handleBlurCreditCardNumber = (event) => {
    if (!event.target.value || !isValidCreditCardNumber(event.target.value)) {
      if (!showCreditCardNumberError) setShowCreditCardNumberError(true);
    }
    else {
      if (showCreditCardNumberError) setShowCreditCardNumberError(false);
      setCreditCardNumber(event.target.value);
      if (readyToSubmit()) setCanSubmit(true);
    }
  }

  const handleChangeCreditExpiration = (event) => {
    if (canSubmit) setCanSubmit(false);
    setExpirationDate(event.target.value);
    if (!event.target.value || !isValidExpirationDate(event.target.value)) {
      if (!showExpirationDateError) setShowExpirationDateError(true);
    }
    else {
      if (showExpirationDateError) setShowExpirationDateError(false);
      setExpirationDate(event.target.value);
    }
  }
  
  const handleBlurCreditExpiration = (event) => {
    if (!event.target.value || !isValidExpirationDate(event.target.value)) {
      if (!showExpirationDateError) setShowExpirationDateError(true);
    }
    else {
      if (showExpirationDateError) setShowExpirationDateError(false);
      setExpirationDate(event.target.value);
      if (readyToSubmit()) setCanSubmit(true);
    }
  }

  return (
    <section>
      <h1>Contact | Billing Information</h1>
      <label for="firstName">First Name<span className="required">*</span></label>
      <input
        type="text"
        name="firstName"
        value={firstName}
        placeholder="First Name"
        onChange={handleChangeFirstName}
        onBlur={handleBlurFirstName}
        className={showFirstNameError ? "errorField" : ""}
      />
      {showFirstNameError && <p className="errorText">Please enter a valid name.</p>}
      <label for="lastName">Last Name<span className="required">*</span></label>
      <input
        type="text"
        name="lastName"
        value={lastName}
        placeholder="Last Name"
        onChange={handleChangeLastName}
        onBlur={handleBlurLastName}
        className={showLastNameError ? "errorField" : ""}
      />
      {showLastNameError && <p className="errorText">Please enter a valid name.</p>}
      <label for="street1">Address Line 1<span className="required">*</span></label>
      <input
        type="text"
        name="street1"
        value={street1}
        placeholder="Address Line 1"
        onChange={handleChangeStreet1}
        onBlur={handleBlurStreet1}
        className={showStreet1Error ? "errorField" : ""}
      />
      {showStreet1Error && <p className="errorText">Please enter a valid address.</p>}
      <label for="street2">Address Line 2</label>
      <input
        type="text"
        name="street2"
        value={street2}
        placeholder="Address Line 2"
        onChange={handleChangeStreet2}
        onBlur={handleBlurStreet2}
      />
      <label for="city">City<span className="required">*</span></label>
      <input
        type="text"
        name="city"
        value={city}
        placeholder="City"
        onChange={handleChangeCity}
        onBlur={handleBlurCity}
        className={showCityError ? "errorField" : ""}
      />
      {showCityError && <p className="errorText">Please enter a valid city.</p>}
      <label for="state">State<span className="required">*</span></label>
      <select name="state" value={state} onChange={handleChangeState} onBlur={handleBlurState} className={showStateError ? "errorField" : ""}>
        <option></option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        <option value="AR">Arkansas</option>
        <option value="CA">California</option>
        <option value="CO">Colorado</option>
        <option value="CT">Connecticut</option>
        <option value="DE">Delaware</option>
        <option value="DC">District of Columbia</option>
        <option value="FL">Florida</option>
        <option value="GA">Georgia</option>
        <option value="HI">Hawaii</option>
        <option value="ID">Idaho</option>
        <option value="IL">Illinois</option>
        <option value="IN">Indiana</option>
        <option value="IA">Iowa</option>
        <option value="KS">Kansas</option>
        <option value="KY">Kentucky</option>
        <option value="LA">Louisiana</option>
        <option value="ME">Maine</option>
        <option value="MD">Maryland</option>
        <option value="MA">Massachusetts</option>
        <option value="MI">Michigan</option>
        <option value="MN">Minnesota</option>
        <option value="MS">Mississippi</option>
        <option value="MO">Missouri</option>
        <option value="MT">Montana</option>
        <option value="NE">Nebraska</option>
        <option value="NV">Nevada</option>
        <option value="NH">New Hampshire</option>
        <option value="NJ">New Jersey</option>
        <option value="NM">New Mexico</option>
        <option value="NY">New York</option>
        <option value="NC">North Carolina</option>
        <option value="ND">North Dakota</option>
        <option value="OH">Ohio</option>
        <option value="OK">Oklahoma</option>
        <option value="OR">Oregon</option>
        <option value="PA">Pennsylvania</option>
        <option value="RI">Rhode Island</option>
        <option value="SC">South Carolina</option>
        <option value="SD">South Dakota</option>
        <option value="TN">Tennessee</option>
        <option value="TX">Texas</option>
        <option value="UT">Utah</option>
        <option value="VT">Vermont</option>
        <option value="VA">Virginia</option>
        <option value="WA">Washington</option>
        <option value="WV">West Virginia</option>
        <option value="WI">Wisconsin</option>
        <option value="WY">Wyoming</option>
      </select>
      {showStateError && <p className="errorText">Please choose a state.</p>}
      <label for="zip">Zip Code<span className="required">*</span></label>
      <input
        type="text"
        name="zip"
        value={zip}
        placeholder="Zip Code"
        onChange={handleChangeZip}
        onBlur={handleBlurZip}
        className={showZipError ? "errorField" : ""}
      />
      {showZipError && <p className='errorText'>Please enter a valid 5-digit zip code.</p>}
      <label for="email">Email<span className="required">*</span></label>
      <input
        type="email"
        name="email"
        value={email}
        placeholder="Email Address"
        onChange={handleChangeEmail}
        onBlur={handleBlurEmail}
        className={showEmailError ? "errorField" : ""}
      />
      {showEmailError && <p className='errorText'>Please enter a valid email address. Ex: sample@sample.com</p>}
      <label for="phone">Phone Number<span className="required">*</span></label>
      <input
        type="text"
        name="phone"
        value={phone}
        placeholder="000-000-0000"
        onChange={handleChangePhone}
        onBlur={handleBlurPhone}
        className={showPhoneNumberError ? "errorField" : ""}
      />
      {showPhoneNumberError && <p className='errorText'>Please enter a valid 10-digit phone number. Ex: 123-234-2345</p>}
      <label for="ccNum">Credit Card Number<span className="required">*</span></label>
      <input
        type="text"
        name="ccNum"
        value={creditCardNumber}
        placeholder="1234 5678 9012 3456"
        onChange={handleChangeCreditCardNumber}
        onBlur={handleBlurCreditCardNumber}
        className={showCreditCardNumberError ? "errorField" : ""}
      />
      {showCreditCardNumberError && <p className="errorText">Please enter a valid 16-digit credit card number. Ex: 0000 0000 0000 0000</p>}
      <label for="exp">Expiration Date<span className="required">*</span></label>
      <input
        type="text"
        name="exp"
        value={expirationDate}
        placeholder="mmyy"
        onChange={handleChangeCreditExpiration}
        onBlur={handleBlurCreditExpiration}
        className={showExpirationDateError ? "errorField" : ""}
      />
      {showExpirationDateError && <p className="errorText">Please enter a valid expiration date. Ex: mm/yy</p>}
    </section>
  );
}

export default BillingInformation;