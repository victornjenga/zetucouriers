import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [exchangeRate, setExchangeRate] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState('KES');

  useEffect(() => {
    // Fetch exchange rates when the component mounts
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(
        'https://api.exchangerate-api.com/v4/latest/KES'
      );
      setExchangeRate(response.data.rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  

  return (
    <CurrencyContext.Provider
      value={{
        exchangeRate,
        selectedCurrency,
        setSelectedCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyContext, CurrencyProvider };
