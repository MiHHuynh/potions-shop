import React from 'react';
import './App.css';
import OrderForm from './OrderForm';


function App() {
  const handleSubmit = (event) => {
    console.log("Submitted!");
    console.log(event);
    event.preventDefault();
  }

  return (
    <div className="App">
      <OrderForm />
    </div>
  );
}

export default App;
