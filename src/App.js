import React from 'react';
import logo from './logo.svg';
import './App.css';


function App() {
  const handleSubmit = (event) => {
    console.log("Submitted!");
    console.log(event);
    event.preventDefault();
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <section>
          <h1>Magic Potion #1</h1>
          <img src="src/images/potionimg.png" />
          <label>Qty<span>*</span></label>
          <input type="number" id="potion-quantity" name="potion-quantity" min="0" max="3" />
          <input type="number" placeholder="0.00" min="0" readOnly={true} />
        </section>
        <section>
          <h1>Contact | Billing Information</h1>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Address Line 1" />
          <input type="text" placeholder="Address Line 2" />
          <input type="text" placeholder="City" />
          <label>
            State
          <select name="state">
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
          </label>
          <input type="text" placeholder="Zip Code" />
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Phone Number" />
          <input type="text" placeholder="Credit Card Number" />
          <input type="text" placeholder="mm/yy" />
        </section>
        <section><input type="submit" value="Pay Now" /></section>
      </form>
    </div>
  );
}

export default App;
