import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [apiData, setApiData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      setApiData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCountries = apiData
    ? apiData.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const cardStyle = {
    width: '150px',
    height: '150px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    margin: '10px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(242 242 242 / 20%)',
  };
  const imageStyle = {
    width: '100px',
    height: '100px',
  };

  return (
    <>
     <div className='headerStyle'>
        <input
          type="text"
          placeholder="Search for countries..."
          className='searchStyle'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='containerStyle'>
        {filteredCountries.map((country) => (
          <div key={country.cca3} style={cardStyle}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={imageStyle}
            />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

