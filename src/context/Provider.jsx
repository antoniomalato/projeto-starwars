import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState([]);
  const [filters, setFilter] = useState({
    filterByName: { name: '' },
  });
  const [filteredPlanet, setFilteredPlanet] = useState([]);
  const [numberFilter, setNumberFilter] = useState([]);
  const [numberValue, setNumberValue] = useState({
    column: 'diameter',
    comparison: 'maior que',
    value: 10000,
  });

  useEffect(() => {
    const fetchApi = async () => {
      const numberFix = -1;
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const planets = await fetch(endpoint);
      const resolve = await planets.json();
      const { results } = resolve;
      results.forEach((el) => delete el.residents);
      const setKey = Object.keys(results[0]);
      setData(results.sort((a, b) => (a.name > b.name ? 1 : numberFix)));
      setKeys(setKey);
      setLoading(false);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const { filterByName: { name } } = filters;
    const planets = data
      .filter((planet) => planet.name.toLowerCase().includes(name.toLocaleLowerCase()));
    setFilteredPlanet(planets);
  }, [data, filters]);

  function handlerChange({ target: { value } }) {
    setFilter({ ...filters, filterByName: { name: value } });
  }
  function currentValue({ target: { value, name } }) {
    setNumberValue({ ...numberValue, [name]: value });
  }

  function selectFilters() {
    const { column, comparison, value } = numberValue;
    let filtrar = filteredPlanet;

    switch (comparison) {
    case 'maior que':
      filtrar = filtrar.filter((planet) => Number(planet[column]) > Number(value));
      // console.log(filtrar, 'maior');
      break;
    case 'menor que':
      filtrar = filtrar.filter((planet) => Number(planet[column]) < Number(value));
      // console.log(filtrar, 'menor');
      break;
    case 'igual a':
      filtrar = filtrar.filter((planet) => Number(planet[column]) === Number(value));
      // console.log(filtrar, 'igual');
      break;
    default:
      filtrar = filteredPlanet;
    }
    // console.log(filtrar);
    setFilteredPlanet(filtrar);
    setNumberFilter([...numberFilter, numberValue]);
  }

  const contextValue = {
    data,
    setData,
    keys,
    setKeys,
    loading,
    setLoading,
    filters,
    setFilter,
    filteredPlanet,
    setFilteredPlanet,
    handlerChange,
    selectFilters,
    currentValue,
    numberValue,
    setNumberValue,
    numberFilter,
    setNumberFilter,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
