import React, { useState, useEffect } from "react";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import phonebookService from "./Components/PhoneBookService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
          })
          .catch((error) => console.log("Error:", error));
      }
    } else {
      const newPerson = { name: newName, number: newNumber };
  
      phonebookService
        .create(newPerson)
        .then((response) => {
          setPersons([...persons, response.data]);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => console.log("Error:", error));
    }
  };
  

  const deletePerson = (id) => {
    const personToDelete = persons.find((person) => person.id === id);

    if (personToDelete && window.confirm(`Delete ${personToDelete.name}?`)) {
      phonebookService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => console.log("Error:", error));
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>

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
