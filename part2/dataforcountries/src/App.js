import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryInfo from "./components/countryInfo";
import CountryList from "./components/countryList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCountry, setShowCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${searchTerm}`)
      .then((response) => {
        setCountries(response.data);
        setShowCountry(null);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleShowCountry = (cca3) => {
    const countryToShow = countries.find((country) => country.cca3 === cca3);
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
