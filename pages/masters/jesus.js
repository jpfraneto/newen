import React from 'react';
import styles from '../../styles/Jesus.module.css';

const Jesus = () => {
  const jesus = {
    masterName: 'Jesus Christ',
    keyTeaching:
      'Love - Love your neighbor as yourself, embracing compassion and empathy.',
    quote: 'Love your neighbor as yourself.',
    periodOfHistory: 'c. 4 BCE - 30/33 CE',
  };
  return (
    <div className={styles.container}>
      <h2>{jesus.masterName}</h2>
      <em>{jesus.quote}</em>
      <p>{jesus.keyTeaching}</p>
    </div>
  );
};

export default Jesus;
