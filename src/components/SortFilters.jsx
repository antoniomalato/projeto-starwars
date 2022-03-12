import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function SortFilters() {
  const { filteredPlanet, setFilteredPlanet } = useContext(Context);
  const [newMap] = useState([
    'name',
    'rotation_period',
    'orbital_period',
    'diameter',
    'climate',
    'gravity',
    'terrain',
    'surface_water',
    'population',
  ]);
  const [order, setOrder] = useState({
    column: 'Name',
    sort: 'ASC',
  });

  function handlerClick() {
    const { column, sort } = order;
    const numberFix = -1;

    const filterSort = [...filteredPlanet];
    if (sort === 'ASC') {
      filterSort.sort((a, b) => (a[column] > b[column] ? 1 : numberFix))
        .sort((a, b) => a[column] - b[column]);
    }
    if (sort === 'DESC') {
      filterSort.sort((a, b) => (a[column] < b[column] ? 1 : numberFix))
        .sort((a, b) => b[column] - a[column]);
    }
    setFilteredPlanet(filterSort);
  }

  function handlerChange({ target: { value } }) {
    setOrder({ ...order, sort: value });
  }

  function handlerSelect({ target: { value } }) {
    setOrder({ ...order, column: value });
  }

  return (
    <>
      <select
        data-testid="column-sort"
        value={ newMap.column }
        onChange={ handlerSelect }
      >
        {newMap.map((inp, key) => <option key={ key }>{inp}</option>)}
      </select>
      <label htmlFor="label">
        ASC
        <input
          name="name"
          type="radio"
          data-testid="column-sort-input-asc"
          id="label"
          value="ASC"
          onClick={ handlerChange }
        />
        DESC
        <input
          name="name"
          type="radio"
          data-testid="column-sort-input-desc"
          id="label"
          onClick={ handlerChange }
          value="DESC"

        />
      </label>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ handlerClick }
      >
        FILTRAR
      </button>
    </>
  );
}

export default SortFilters;
