import React, { useState, useEffect } from "react";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import phonebookService from "./Components/PhoneBookService";
import './index.css';
import Notification from './Components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    phonebookService
      .getAll()
      .then((response) => setPersons(response.data))
      .catch((error) => console.log("Error:", error));
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
  
    const existingPerson = persons.find((person) => person.name.toLowerCase() === newName.toLowerCase());
  
    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${existingPerson.name} is already added to the phonebook. Do you want to update the number?`
      );
  
      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
  
        phonebookService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(persons.map((person) => (person.id === existingPerson.id ? response.data : person)));
            setNewName("");
            setNewNumber("");
            setSuccessMessage(`Number updated for ${existingPerson.name}`);
            setTimeout(() => {
              setSuccessMessage(null);
            }, 3000);
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              setErrorMessage('The person has already been removed.');
            } else {
              setErrorMessage('Failed to update the person\'s number.');
              console.log('Error:', error);
            }
          });
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
  
      phonebookService
        .create(newPerson)
        .then((response) => {
          setPersons([...persons, response.data]);
          setNewName("");
          setNewNumber("");
          setSuccessMessage(`Added ${response.data.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage("Failed to create a new person.");
          console.log("Error:", error);
        });
    }
  };
  

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccessMessage(`Deleted ${personToDelete.name}`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        })
        .catch((error) => {
          setErrorMessage('Failed to delete the person.');
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          console.log('Error:', error);
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      {errorMessage && <Notification message={errorMessage} isError={true} />}
      {successMessage && <Notification message={successMessage} />}

      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
