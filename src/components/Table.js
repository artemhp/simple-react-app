import React from "react";
import formatDate from "../common/utils/formatDate";
import PropTypes from "prop-types";

Table.propTypes = {};

function Table({ data }) {
  const showRows = (data) => {
    console.log(data);
    return data.map((el) => (
      <tr>
        <td>{el.userName}</td>
        <td>{el.story.length}</td>
        <td>{formatDate(el.userDob)}</td>
      </tr>
    ));
  };
  if (!data || (data && !data.length)) {
    return null;
  }

  console.log(data);
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
