// CountryInfo.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Weather from './weather';
const CountryInfo = ({ country }) => {
  const { name, capital, population, area, languages, flags, flag } = country;

  return (
    <div>
      <h2>{name.common}</h2>
      <p>Capital: {capital[0]}</p>
      <Weather capital={capital[0]} />
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
    </div>
  );
};

export default CountryInfo;
