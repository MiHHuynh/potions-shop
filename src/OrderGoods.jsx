import React, { useState } from 'react';
import potion from './potion.png';

const OrderGoods = ({ quantity, total, setQuantity, setTotal, canSubmit,setCanSubmit}) => {
  const errors = {
    exceedsMax: "The maximum quantity you can purchase is 3.",
    zeroQuantity: "Please enter at least 1."
  }
  const [showQuantityError, setShowQuantityError] = useState(false);
  const [quantityErrorText, setQuantityErrorText] = useState("");

  const handleChangeQuantity = (event) => {
    if (canSubmit) setCanSubmit(false);
    setQuantity(parseInt(event.target.value));
    if (event.target.value && event.target.value > 3) {
      setShowQuantityError(true);
      setQuantityErrorText(errors.exceedsMax);
    }
    else {
      if (showQuantityError) setShowQuantityError(false);
      setQuantity(parseInt(event.target.value));
      let total = event.target.value * 49.99;
      setTotal(total.toString());
      setCanSubmit(true);
    }
  };

  const handleBlurQuantity = (event) => {
    if (event.target.value == 0) {
      setShowQuantityError(true);
      setQuantityErrorText(errors.zeroQuantity);
    }
  }

  return (
    <div>
      <h1>Magic Potion #1</h1>
      <img src={potion} className="image" />
      <label for="quantity">Qty<span className="required">*</span></label>
      <input
        type="number"
        min="0"
        max="3"
        name="quantity"
        value={quantity}
        onChange={handleChangeQuantity}
        onBlur={handleBlurQuantity}
        className={showQuantityError ? "errorField" : ""}
      />
      {showQuantityError && <p className="errorText">{quantityErrorText}</p>}
      <label for="total">Total Cost</label>
      <input
        type="number"
        name="total"
        value={total}
        disabled={true}
      />
    </div>
  );
}

export default OrderGoods;