import { useState } from "react";

import FilterForm from "./components/FilterForm";
import InputForm from "./components/InputForm";
import OutputForm from "./components/OutputForm";

import "./App.css";

const App = () => {
  // useState
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "012-345-6789", id: 1 },
    { name: "Ada Lovelace", phone: "012-345-6789", id: 2 },
  ]);

  // Handler Functions
  const handleSubmit = (event) => {
    event.preventDefault();
    const copyName = newName
      .trim()
      .split(" ")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
      .join(" ");

    let copyPhone = newPhone.trim();
    copyPhone = [
      copyPhone.slice(0, 3),
      copyPhone.slice(3, 6),
      copyPhone.slice(6),
    ].join("-");
    if (persons.some((item) => item.name === copyName)) {
      alert(`${copyName} is already added to phonebook`);
    } else {
      setPersons([
        ...persons,
        { name: copyName, phone: copyPhone, id: persons.length + 1 },
      ]);
    }

    console.log("submit", copyName);
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    console.log(event.target.value);
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilterQuery(event.target.value);
  };

  const handleEnter = (event) => {
    event.preventDefault();
  };

  return (
    <div className='App'>
      <h2>Phonebook</h2>
      <h3>Find person in phonebook</h3>
      <FilterForm
        filterQuery={filterQuery}
        handleFilterChange={handleFilterChange}
        handleEnter={handleEnter}
      />
      <br />
      <h3>Add new person</h3>
      <InputForm
        newName={newName}
        newPhone={newPhone}
        handleSubmit={handleSubmit}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <OutputForm persons={persons} filterQuery={filterQuery} />
    </div>
  );
};

export default App;
