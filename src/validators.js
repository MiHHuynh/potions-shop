export const isValidText = (input) => {
  let lettersAndSpaces = /^[a-zA-Z\s]*$/;
  return lettersAndSpaces.test(input);
}

export const isValidEmail = (input) => {
  // Sourced from https://emailregex.com/
  let emailRegularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegularExpression.test(input);
}

export const isValidPhoneNumber = (input) => {
  // Sourced from https://www.oreilly.com/library/view/regular-expressions-cookbook/9781449327453/ch04s02.html
  let phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(input);
}

export const isValidAddress = (input) => {
  let lettersAndSpaces = /^[#.0-9a-zA-Z\s,-]+$/;
  return lettersAndSpaces.test(input);
}

export const isValidZipCode = (input) => {
  let fiveDigitZipCode = /^\d{5}$/;
  return fiveDigitZipCode.test(input);
}

export const isValidCreditCardNumber = (input) => {
  let sixteenDigitCreditCardNumber = /^\d{16}$/;
  return sixteenDigitCreditCardNumber.test(input);
}

export const isValidExpirationDate = (input) => {
  let fiveDigitZipCode = /^\d{4}$/;
  return fiveDigitZipCode.test(input);
}