import React from 'react';
import masters from '../../data/masters';

const Masters = () => {
  console.log('inside here, the masters are: ', masters);
  return (
    <div>
      {masters.map((x, i) => {
        return <MasterDisplay key={i} master={x} />;
      })}
    </div>
  );
};

const MasterDisplay = ({ master }) => {
  return (
    <div
      style={{
        color: 'white',
        border: 'solid white 2px',
        margin: '8px',
        padding: '8px',
        width: 'fit-content',
        borderRadius: '8px',
      }}
    >
      <h3>{master.masterName}</h3>
      <small>{master.periodOfHistory}</small>
      <br />
      <em>{master.quote}</em>
      <p>{master.keyTeaching}</p>
    </div>
  );
};

export default Masters;
