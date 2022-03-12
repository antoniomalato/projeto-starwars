import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function Input() {
  const {
    data,
    // setData,
    // keys,
    // setKeys,
    // loading,
    // setLoading,
    filters,
    // setFilter,
    // filteredPlanet,
    setFilteredPlanet,
    handlerChange,
    selectFilters,
    currentValue,
    numberValue,
    setNumberValue,
    // numberFilter,
    // setNumberFilter,
  } = useContext(Context);
  const [changeOption, setChangeOption] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [filterButton, setFilterButton] = useState(false);
  const [colRemove, setColRemove] = useState([]);
  const [compariSON] = useState([
    'maior que',
    'menor que',
    'igual a',
  ]);

  function clearFilter({ target }) {
    setFilteredPlanet(data);
    if (!(target.name in changeOption)) setChangeOption([...changeOption, target.name]);
    setColRemove(colRemove.filter((coluna) => coluna !== target.name));
  }

  function handlerClick() {
    selectFilters();
    let changeOp = changeOption;
    const remove = numberValue.column;
    changeOp = changeOp.filter((column) => column !== remove);

    setChangeOption(changeOp);

    if (!(remove in colRemove)) setColRemove([...colRemove, remove]);
    setFilterButton(true);
    setNumberValue({ ...numberValue, column: remove[0] });
  }

  const value = filters.filterByName.name;
  const valueColumn = numberValue.column;
  const valueComparison = numberValue.comparison;
  const values = numberValue.value;

  return (
    <header>
      <label htmlFor="search">
        <input
          type="text"
          id="search"
          onChange={ handlerChange }
          value={ value }
          data-testid="name-filter"
        />
      </label>
      <label htmlFor="search-filters">
        <select
          id="search-filters"
          name="column"
          data-testid="column-filter"
          onChange={ currentValue }
          vale={ valueColumn }
        >
          {changeOption.map((col) => <option key={ col }>{col}</option>)}
        </select>
        <select
          name="comparison"
          id="search-filters"
          data-testid="comparison-filter"
          onChange={ currentValue }
          value={ valueComparison }
        >
          {compariSON.map((comp) => <option key={ comp }>{comp}</option>)}
        </select>
        <input
          name="value"
          id="search-filters"
          type="number"
          data-testid="value-filter"
          onChange={ currentValue }
          value={ values }
        />
        <button
          data-testid="button-filter"
          type="button"
          onClick={ handlerClick }
        >
          Buscar
        </button>
      </label>
      { filterButton
          && colRemove.map((col) => (
            <div key={ col } data-testid="filter">
              {col}
              <button
                type="button"
                onClick={ clearFilter }
                name={ col }
              >
                X
              </button>
            </div>)) }
    </header>
  );
}

export default Input;
