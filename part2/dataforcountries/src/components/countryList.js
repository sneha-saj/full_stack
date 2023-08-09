// CountryList.js
import React from 'react';

const CountryList = ({ countries, handleShowCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter.</p>;
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.cca3}>
          {country.name.common}{' '}
          <button onClick={() => handleShowCountry(country.cca3)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
