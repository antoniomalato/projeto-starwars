import React from 'react';
import './App.css';
import Input from './components/Input';
import SortFilters from './components/SortFilters';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Input />
      <SortFilters />
      <Table />
    </Provider>
  );
}

export default App;
