import React, { useContext } from 'react';
import Context from '../context/Context';
import Loading from './Loading';

function Table() {
  const { loading, keys, filteredPlanet } = useContext(Context);

  if (loading) return <Loading />;

  return (
    <table>
      <thead>
        <tr>
          {keys.map((el) => (<th key={ el }>{el}</th>))}
        </tr>
      </thead>
      <tbody>
        {filteredPlanet.map((plan) => (
          <tr key={ plan.name }>
            {keys.map((i) => (
              <td
                data-testid={ i === 'name' ? 'planet-name' : '' }
                key={ i }
              >
                {plan[i]}
              </td>))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
