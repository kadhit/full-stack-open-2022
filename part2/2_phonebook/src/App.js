import { useState, useEffect } from 'react';
import { phonebook } from './services/phonebook';

import FilterForm from './components/FilterForm';
import InputForm from './components/InputForm';
import OutputForm from './components/OutputForm';

import './App.css';

const App = () => {
  // useState
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '012-345-6789', id: 1 },
    { name: 'Ada Lovelace', phone: '012-345-6789', id: 2 },
  ]);

  // useEffect
  useEffect(() => {
    phonebook.getAll().then((initialData) => setPersons(initialData));
  }, []);

  // Handler Functions
  const handleSubmit = (event) => {
    event.preventDefault();
    const copyName = newName
      .trim()
      .split(' ')
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
      .join(' ');

    let copyPhone = newPhone.trim();
    copyPhone = [
      copyPhone.slice(0, 3),
      copyPhone.slice(3, 6),
      copyPhone.slice(6),
    ].join('-');

    if (persons.some((item) => item.name === copyName)) {
      if (
        window.confirm(
          `${copyName} is already added to phonebook. Do you want to update this?`
        )
      ) {
        const person = persons.find((item) => item.name === copyName);

        phonebook
          .updateUser(person.id, {
            ...person,
            name: copyName,
            phone: copyPhone,
          })
          .then((updatedObject) =>
            setPersons(
              persons.map((item) =>
                item.id === person.id ? updatedObject : item
              )
            )
          );
      }
    } else {
      phonebook
        .createUser({
          name: copyName,
          phone: copyPhone,
          id: persons[persons.length - 1].id + 1,
        })
        .then((updatedObject) => setPersons(persons.concat(updatedObject)));
      // setPersons([
      //   ...persons,
      //   { name: copyName, phone: copyPhone, id: persons.length + 1 },
      // ]);
    }

    console.log('submit', copyName);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const name = event.target.value;
    if (window.confirm(`Delete ${name}?`)) {
      phonebook
        .deleteUser(persons.find((item) => item.name === name).id)
        .then(() => setPersons(persons.map((item) => item.name !== name && item)));
    }
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
      <h1>Phonebook</h1>
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
      <h1>Numbers</h1>
      <OutputForm
        persons={persons}
        filterQuery={filterQuery}
        deletePerson={handleDelete}
      />
    </div>
  );
};

export default App;
