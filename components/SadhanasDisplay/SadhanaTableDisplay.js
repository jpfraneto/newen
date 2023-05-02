import React from 'react';

const SadhanaTableDisplay = ({ columns, rows }) => {
  return (
    <table className='table-auto w-full my-2 text-white shadow-md rounded-md'>
      <thead>
        <tr className='bg-black text-white'>
          {columns.map((column, index) => (
            <th key={index} className='px-4 py-2 text-white'>
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default SadhanaTableDisplay;
