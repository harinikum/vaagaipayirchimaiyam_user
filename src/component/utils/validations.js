export const EmptyValidation = (validateTextValue) => {
  if (
    validateTextValue == "" ||
    validateTextValue == undefined ||
    validateTextValue == null
  ) {
    return "Required field";
  } else {
    return false;
  }
};

export const MobileNumberValidation = (validateTextValue) => {
  const phoneNumberPattern = /^\d{10}$/;

  if (validateTextValue == "" || validateTextValue == undefined) {
    return "Required field";
  } else if (!/^\d+$/.test(validateTextValue)) {
    return "Only numeric characters are allowed";
  } else if (validateTextValue.length !== 10) {
    return "Enter 10 digit mobile number";
  } else {
    const modifiedString = validateTextValue.replace(/\+91|\s/g, "");
    const isValidPhoneNumber = phoneNumberPattern.test(modifiedString);
    if (isValidPhoneNumber) {
      return false;
    } else {
      return "Enter a valid Phone Number";
    }
  }
};
