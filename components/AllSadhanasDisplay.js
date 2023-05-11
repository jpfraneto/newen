import { useState, useEffect } from 'react';
import BiggerLayout from './BiggerLayout';
import Button from './Button';
import { BiSearchAlt } from 'react-icons/bi';
import SadhanaCard from './SadhanaCard';

const AllSadhanasDisplay = ({ sadhanas }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSadhanas, setFilteredSadhanas] = useState(sadhanas);

  useEffect(() => {
    setFilteredSadhanas(
      sadhanas.filter(sadhana =>
        sadhana.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, sadhanas]);

  return (
    <BiggerLayout>
      <h1 className='text-3xl mb-2'>Sadhanas</h1>
      <div className='flex flex-row space-x-2'>
        <input
          type='text'
          className='border-2 border-black rounded-md focus:border-thegreen px-2 py-1 font-md w-1/3'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='Search for sadhanas...'
        />
        <Button
          buttonColor='bg-thegreen'
          buttonText={<BiSearchAlt />}
          buttonAction={() => alert(`Hello there 👀`)}
        />
      </div>
      <div className='mt-4 flex flex-wrap justify-between'>
        {filteredSadhanas.map(sadhana => (
          <SadhanaCard key={sadhana.id} sadhana={sadhana} />
        ))}
      </div>
    </BiggerLayout>
  );
};

export default AllSadhanasDisplay;
