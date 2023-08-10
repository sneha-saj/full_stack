// CountryInfo.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from './weather';
const CountryInfo = ({ country }) => {
  const { name, capital, latlng, population, area, languages, flags, flag } = country;
  return (
    <div>
      <h2>{name.common}</h2>
      <p>Capital: {capital[0]}</p>
      <p>Population: {population}</p>
      <p>Area: {area} km²</p>
      <h3>Languages</h3>
      <ul>
        {Object.entries(languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <h3>Flag</h3>
      {flags.png ? (
        <img
          src={flags.png}
          alt={`${name.common} Flag`}
          style={{ maxWidth: "200px" }}
        />
      ) : (
        <span>{flag}</span>
      )}
            <Weather latlng={latlng} capital={capital}/>

    </div>
  );
};

export default CountryInfo;
