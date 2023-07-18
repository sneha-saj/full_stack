import React, { useState } from 'react';
import Persons from './Components/Persons.js'; 
import PersonForm from './Components/PersonForm.js'; 
import Filter from './Components/Filter.js'; 

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/persons')
      .then(response => response.json())
      .then(data => setPersons(data));
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

    // Check if the name already exists
    const isNameExists = persons.some((person) => person.name.toLowerCase() === newName.toLowerCase());

    if (isNameExists) {
      // Issue an error message
      alert(`${newName} is already added to phonebook`);
    } else {
      const person = { name: newName, number: newNumber, id: persons.length + 1 };
      setPersons([...persons, person]);
      setNewName('');
      setNewNumber('');
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

      <Persons persons={filteredPersons} />
    </div>
  );
};

export default App;
