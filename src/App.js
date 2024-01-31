import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (term) => {
    const lowerCaseTerm = term.toLowerCase();
    setSearchTerm(lowerCaseTerm);
  
    if (lowerCaseTerm === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(
        (country) => country.name.common.toLowerCase().includes(lowerCaseTerm)
      );
      setFilteredCountries(filtered);
    }
  };
  
  const cardStyle = {
    width: "150px",
    height:"150px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'rgb(242 242 242 / 20%)',
  };
  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  return (
    <>
    <div className='headerStyle'>
      <input
        type="text"
        id="searchInput"
        className="searchStyle"
        placeholder="Search for a countries..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      /> </div>

         <div className='containerStyle'>
 
        {filteredCountries.map((country) => (
          <div style={cardStyle} key={country.name.common}>
            <img src={country.flags.svg} alt={country.name.common}     style={imageStyle} />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>

    </>
  );
}
export default App;
