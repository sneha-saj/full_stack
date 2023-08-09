import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryInfo = ({ country }) => {
  const { name, capital, population, area, languages, flag, flags } = country;

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
            {language}
          </li>
        ))}
      </ul>
      <h3>Flag</h3>
      {flags.png ? (
        <img src={flags.png} alt={`${name.common} Flag`} style={{ maxWidth: '200px' }} />
      ) : (
        <span>{flag}</span>
      )}    </div>
  );
};

const CountryList = ({ countries, handleShowCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}{' '}
          <button onClick={() => handleShowCountry(country.cca3)}>
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

  const handleShowCountry = (cca3) => {
    const countryToShow = countries.find(
      (country) => country.cca3 === cca3
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
