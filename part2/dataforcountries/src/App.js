import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryInfo = ({ country }) => {
  const { name, capital, population, area, languages, flag } = country;

  return (
    <div>
      <h2>{name.common}</h2>
      <p>Capital: {capital[0]}</p>
      <p>Population: {population}</p>
      <p>Area: {area} km²</p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(languages).map(([code, language]) => (
          <li key={code}>
            {language.name} ({language.nativeName})
          </li>
        ))}
      </ul>
    </div>
  );
};


const CountryList = ({ countries, handleShowCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.alpha3Code}>
          {country.name}{' '}
          <button onClick={() => handleShowCountry(country.alpha3Code)}>
            Show
          </button>
        </li>
      ))}
    </ul>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCountry, setShowCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then((response) => {
        console.log(response.data);
        setCountries(response.data);
        setShowCountry(null);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowCountry = (alpha3Code) => {
    const countryToShow = countries.find(
      (country) => country.alpha3Code === alpha3Code
    );
    setShowCountry(countryToShow);
  };

  return (
    <div>
      <h2>Country Information</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search country..."
      />

      {showCountry ? (
        <CountryInfo country={showCountry} />
      ) : (
        <CountryList
          countries={countries}
          handleShowCountry={handleShowCountry}
        />
      )}
    </div>
  );
};

export default App;
