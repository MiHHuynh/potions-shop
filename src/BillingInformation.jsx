import React, { useState } from 'react';
import { isValidText, isValidEmail, isValidPhoneNumber, isValidAddress, isValidZipCode, isValidCreditCardNumber, isValidExpirationDate } from './validators';

const BillingInformation = ({
  setFirstName,
  setLastName,
  setEmail,
  setStreet1,
  setStreet2,
  setCity,
  setState,
  setZip,
  setPhone,
  setCcNum,
  setExpirationDate
}) => {
  const [showFirstNameError, setShowFirstNameError] = useState(false);
  const [showLastNameError, setShowLastNameError] = useState(false);
  const [showStreet1Error, setShowStreet1Error] = useState(false);
  const [showStreet2Error, setShowStreet2Error] = useState(false);
  const [showCityError, setShowCityError] = useState(false);
  const [showStateError, setShowStateError] = useState(false);
  const [showZipError, setShowZipError] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPhoneNumberError, setShowPhoneNumberError] = useState(false);
  const [showCreditCardNumberError, setShowCreditCardNumberError] = useState(false);
  const [showExpirationDateError, setShowExpirationDateError] = useState(false);

  const checkCanSubmit = () => {
    // TODO:
    // need to know if everything has been touched
    // check that all have been touched and are now all valid
  }

  const handleChangeFirstName = (event) => {
    // when the input changes, validate it.
    // if it's not valid, show the error.
    // if it IS valid, turn off the error if it's on, and log it to the state of the parent (THE FORM)
    console.log(event.target.value);
    if (event.target.value && !isValidText(event.target.value)) {
      if (!showFirstNameError) setShowFirstNameError(true); // only set the state if it needs to be changed to avoid unnecessary rerenders
    }
    else {
      // does it make sense to log the value to the state while changing vs. just onBlur?
      if (showFirstNameError) setShowFirstNameError(false);
      setFirstName(event.target.value);
    }
  }

  const handleBlurFirstName = (event) => {
    console.log('blur first name');
    // if it's invalid, make sure error is showing
    if (!event.target.value || !isValidText(event.target.value)) {
      if (!showFirstNameError) setShowFirstNameError(true); // only set the state if it needs to be changed to avoid unnecessary rerenders
    }
    else {
      if (showFirstNameError) setShowFirstNameError(false);
      setFirstName(event.target.value);
    }
  }
  
  const handleChangeLastName = (event) => {
    console.log(event.target.value);
    if (event.target.value && !isValidText(event.target.value)) {
      if (!showLastNameError) setShowLastNameError(true);
    }
    else {
      // does it make sense to log the value to the state while changing vs. just onBlur?
      if (showLastNameError) setShowLastNameError(false);
      setLastName(event.target.value);
    }
  }
  
  const handleBlurLastName = (event) => {
    // if it's invalid, make sure error is showing
    if (!event.target.value || !isValidText(event.target.value)) {
      if (!showLastNameError) setShowLastNameError(true); // only set the state if it needs to be changed to avoid unnecessary rerenders
    }
    else {
      if (showLastNameError) setShowLastNameError(false);
      setLastName(event.target.value);
    }
  }

  const handleChangeStreet1 = (event) => {
    console.log(event.target.value);
    if (event.target.value && !isValidAddress(event.target.value)) {
      if (!showStreet1Error) setShowStreet1Error(true);
    }
    else {
      // does it make sense to log the value to the state while changing vs. just onBlur?
      if (showStreet1Error) setShowStreet1Error(false);
      setStreet1(event.target.value);
    }
  }

  const handleBlurStreet1 = (event) => {
    if (!event.target.value || !isValidAddress(event.target.value)) {
      if (!showStreet1Error) setShowStreet1Error(true); // only set the state if it needs to be changed to avoid unnecessary rerenders
    }
    else {
      if (showStreet1Error) setShowStreet1Error(false);
      setStreet1(event.target.value);
    }
  }

  const handleChangeStreet2 = (event) => {
    // validateText(event.target.value);
  }

  const handleBlurStreet2 = (event) => {
    // validateText(event.target.value);
  }
  
  const handleChangeCity = (event) => {
    console.log(event.target.value);
    if (event.target.value && !isValidText(event.target.value)) {
      if (!showCityError) setShowCityError(true);
    }
    else {
      // does it make sense to log the value to the state while changing vs. just onBlur?
      if (showCityError) setShowCityError(false);
      setCity(event.target.value);
    }
  }
  
  const handleBlurCity = (event) => {
    // if it's invalid, make sure error is showing
    if (!event.target.value || !isValidText(event.target.value)) {
      if (!showCityError) setShowCityError(true); // only set the state if it needs to be changed to avoid unnecessary rerenders
    }
    else {
      if (showCityError) setShowCityError(false);
      setCity(event.target.value);
    }
  }
  
  const handleBlurState = (event) => {
    if (!event.target.value) {
      if (!showStateError) setShowStateError(true);
    }
    else {
      if (showStateError) setShowStateError(false);
      setState(event.target.value);
    }
  }

  const handleChangeZip = (event) => {
    if (!event.target.value || !isValidZipCode(event.target.value)) {
      if (!showZipError) setShowZipError(true); // only set the state if it needs to be changed to avoid unnecessary rerenders
    }
    else {
      if (showZipError) setShowZipError(false);
      setZip(event.target.value);
    }
  }
  
  const handleBlurZip = (event) => {
    if (!event.target.value || !isValidZipCode(event.target.value)) {
      if (!showZipError) setShowZipError(true); // only set the state if it needs to be changed to avoid unnecessary rerenders
    }
    else {
      if (showZipError) setShowZipError(false);
      setZip(event.target.value);
    }
  }

  const handleChangeEmail = (event) => {
    if (!event.target.value || !isValidEmail(event.target.value)) {
      if (!showEmailError) setShowEmailError(true); // only set the state if it needs to be changed to avoid unnecessary rerenders
    }
    else {
      if (showEmailError) setShowEmailError(false);
      setEmail(event.target.value);
    }
  }
  
  const handleBlurEmail = (event) => {
    // if it's invalid, make sure error is showing
    if (!event.target.value || !isValidEmail(event.target.value)) {
      if (!showEmailError) setShowEmailError(true); // only set the state if it needs to be changed to avoid unnecessary rerenders
    }
    else {
      if (showEmailError) setShowEmailError(false);
      setEmail(event.target.value);
    }
  }

  const handleChangePhone = (event) => {
    if (!event.target.value || !isValidPhoneNumber(event.target.value)) {
      if (!showPhoneNumberError) setShowPhoneNumberError(true); // only set the state if it needs to be changed to avoid unnecessary rerenders
    }
    else {
      if (showPhoneNumberError) setShowPhoneNumberError(false);
      setPhone(event.target.value);
    }
  }
  
  const handleBlurPhone = (event) => {
    // if it's invalid, make sure error is showing
    if (!event.target.value || !isValidPhoneNumber(event.target.value)) {
      if (!showPhoneNumberError) setShowPhoneNumberError(true); // only set the state if it needs to be changed to avoid unnecessary rerenders
    }
    else {
      if (showPhoneNumberError) setShowPhoneNumberError(false);
      setPhone(event.target.value);
    }
  }

  const handleChangeCreditCardNumber = (event) => {
    if (!event.target.value || !isValidCreditCardNumber(event.target.value)) {
      if (!showCreditCardNumberError) setShowCreditCardNumberError(true); // only set the state if it needs to be changed to avoid unnecessary rerenders
    }
    else {
      if (showCreditCardNumberError) setShowCreditCardNumberError(false);
      setCcNum(event.target.value);
    }
  }

  const handleBlurCreditCardNumber = (event) => {
    if (!event.target.value || !isValidCreditCardNumber(event.target.value)) {
      if (!showCreditCardNumberError) setShowCreditCardNumberError(true);
    }
    else {
      if (showCreditCardNumberError) setShowCreditCardNumberError(false);
      setCcNum(event.target.value);
    }
  }

  const handleChangeCreditExpiration = (event) => {
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
    }
  }

  return (
    <section>
      <h1>Contact | Billing Information</h1>
      <label for="firstName">First Name<span className="required">*</span></label>
      <input
        type="text"
        name="firstName"
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
        placeholder="Address Line 2"
      />
      {showStreet2Error && <p className="errorText">Please enter a valid address.</p>}
      <label for="city">City<span className="required">*</span></label>
      <input
        type="text"
        name="city"
        placeholder="City"
        onChange={handleChangeCity}
        onBlur={handleBlurCity}
        className={showCityError ? "errorField" : ""}
      />
      {showCityError && <p className="errorText">Please enter a valid city.</p>}
      <label for="state">State<span className="required">*</span></label>
      <select name="state" onBlur={handleBlurState} className={showStateError ? "errorField" : ""}>
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
        placeholder="mm/yy"
        onChange={handleChangeCreditExpiration}
        onBlur={handleBlurCreditExpiration}
        className={showExpirationDateError ? "errorField" : ""}
      />
      {showExpirationDateError && <p className="errorText">Please enter a valid expiration date. Ex: mm/yy</p>}
    </section>
  );
}

export default BillingInformation;