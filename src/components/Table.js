import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../common/utils/formatDate';
import InputForm from './form/controls/InputForm';
import useForm from '../common/hooks/useForm';

Table.propTypes = {};

const initValue = data => data.reduce((acc, cur, i) => {
    acc[`i${i}`] = cur.rate;
    return acc;
  }, {});

function Table({ data, updateData }) {
  const { handleInputChange, handleReset, state } = useForm(initValue(data));

  const handleBlur = () => {
    updateData(
      data.map((el, index) => ({
        ...el,
        rate: parseInt(state[`i${index}`]),
      })),
    );
  };

  const showRows = data => {
    return data.map((el, index) => (
      <tr key={index}>
        <td>{el.name}</td>
        <td>
          <InputForm
            placeholder="DoB"
            required
            name={`i${index}`}
            value={state[`i${index}`]}
            onChange={handleInputChange}
            onBlur={handleBlur}
            type="number"
          />
        </td>
        <td>{formatDate(el.dob)}</td>
      </tr>
    ));
  };
  if (!data || (data && !data.length)) {
    return null;
  }

  return (
    <table className="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Story Length</th>
          <th>Date of Birth</th>
        </tr>
      </thead>
      <tbody>{showRows(data)}</tbody>
    </table>
  );
}

export default Table;
