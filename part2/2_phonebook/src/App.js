import { useState, useEffect } from 'react';
import { phonebook } from './services/phonebook';

import FilterForm from './components/FilterForm';
import InputForm from './components/InputForm';
import OutputForm from './components/OutputForm';
import Notification from './components/Notification';

import './App.css';

const App = () => {
  // useState
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filterQuery, setFilterQuery] = useState('');
  const [message, setMessage] = useState(null);
  const [style, setStyle] = useState({});
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '012-345-6789', id: 1 },
    { name: 'Ada Lovelace', phone: '012-345-6789', id: 2 },
  ]);

  // useEffect
  useEffect(() => {
    // Axios GET
    phonebook
      .getAll()
      .then((initialData) => setPersons(initialData))
      .catch((error) => {
        console.log(error.message);
        setMessage('Something went wrong');
        setStyle({ backgroundColor: 'red' });
        // Please use 3000 for all setTimeout
        setTimeout(() => {
          setMessage(null);
          setStyle({});
        }, 3000);
      });
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

        //Axios PUT
        phonebook
          .updateUser(person.id, {
            ...person,
            name: copyName,
            phone: copyPhone,
          })
          .then((updatedObject) => {
            setPersons(
              persons.map((item) =>
                item.id === person.id ? updatedObject : item
              )
            );
            setMessage(`${updatedObject.name} is successfully updated`);
            setStyle({ backgroundColor: 'green' });
            // Please use 3000 for all setTimeout
            setTimeout(() => {
              setMessage(null);
              setStyle({});
            }, 3000);
          })
          .catch((error) => {
            console.log(error.message);
            setMessage(
              `Information of ${person.name} has already been removed from the server`
            );
            setStyle({ backgroundColor: 'red' });
            // Please use 3000 for all setTimeout
            setTimeout(() => {
              setMessage(null);
              setStyle({});
            }, 3000);
          });
      }
    } else {
      //Axios POST
      phonebook
        .createUser({
          name: copyName,
          phone: copyPhone,
          id: persons[persons.length - 1].id + 1,
        })
        .then((updatedObject) => {
          setPersons(persons.concat(updatedObject));
          setMessage(`${updatedObject.name} is successfully added`);
          setStyle({ backgroundColor: 'green' });
          // Please use 3000 for all setTimeout
          setTimeout(() => {
            setMessage(null);
            setStyle({});
          }, 3000);
        })
        .catch((error) => {
          console.log(error.message);
          setMessage('Something went wrong');
          setStyle({ backgroundColor: 'red' });
          // Please use 3000 for all setTimeout
          setTimeout(() => {
            setMessage(null);
            setStyle({});
          }, 3000);
        });
    }

    console.log('submit', copyName);
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const name = event.target.value;
    if (window.confirm(`Delete ${name}?`)) {
      // Axios DELETE
      phonebook
        .deleteUser(persons.find((item) => item.name === name).id)
        .then(() => {
          setPersons(persons.map((item) => item.name !== name && item));
          setMessage(`${name} has been deleted`);
          setStyle({ backgroundColor: 'rgb(0, 125, 250)' });
          // Please use 3000 for all setTimeout
          setTimeout(() => {
            setMessage(null);
            setStyle({});
          }, 3000);
        })
        .catch((error) => {
          console.log(error.message);
          setMessage(
            `Information of ${name} has already been removed from the server`
          );
          setStyle({ backgroundColor: 'red' });
          // Please use 3000 for all setTimeout
          setTimeout(() => {
            setMessage(null);
            setStyle({});
          }, 3000);
        });
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
      <Notification message={message} style={style} />
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
