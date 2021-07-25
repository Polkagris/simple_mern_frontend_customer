import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [fetchedData, setFetchedData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [listUpdated, setListUpdated] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await axios.get("http://localhost:3001/customerlist");
      setFetchedData(data);
    };
    getData();
  }, [listUpdated]);

  console.log("data: ", fetchedData);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const addCustomerHandler = async () => {
    setListUpdated(true);
    const newCustomer = {
      customerFirstName: firstName,
      customerLastName: lastName,
    };
    await axios.post("http://localhost:3000/customer", newCustomer);
    setFirstName("");
    setLastName("");
    setListUpdated(false);
  };

  return (
    <div className="App">
      <h1>Customers</h1>
      {fetchedData.data ? (
        <ul>
          {fetchedData.data.map((customer, index) => {
            return (
              <li
                key={index}
              >{`${customer.customerFirstName} ${customer.customerLastName}`}</li>
            );
          })}
        </ul>
      ) : null}
      <div>
        <div>
          <div>First Name</div>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
          />
        </div>
        <div>
          <div>Last Name</div>
          <input type="text" value={lastName} onChange={handleLastNameChange} />
        </div>
        <button onClick={addCustomerHandler}>Add new customer</button>
      </div>
    </div>
  );
}

export default App;
