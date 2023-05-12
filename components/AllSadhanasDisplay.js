import { useState, useEffect } from 'react';
import BiggerLayout from './BiggerLayout';
import Button from './Button';
import { BiSearchAlt } from 'react-icons/bi';
import SadhanaCard from './SadhanaCard';

const AllSadhanasDisplay = ({ sadhanas }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSadhanas, setFilteredSadhanas] = useState(sadhanas);
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    'Creativity',
    'Health',
    'Entertainment',
    'WellBeing',
    'Productivity',
    'Money',
    'Education',
    'Hobbies',
    'Tasks',
    'Relationships',
    'Business',
  ];

  useEffect(() => {
    setFilteredSadhanas(
      sadhanas.filter(sadhana =>
        sadhana.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, sadhanas]);

  const toggleTag = tag => {
    if (selectedTags.includes(tag)) {
      // If the tag is already selected, remove it from the state
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      // Otherwise, add it to the state
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <div>
      <h1 className='text-3xl mb-2'>Sadhanas</h1>
      <div className='flex flex-row flex-wrap mb-2'>
        {tags.map((tag, i) => {
          const isSelected = selectedTags.includes(tag);
          return (
            <span
              key={i}
              onClick={() => toggleTag(tag)}
              className={`p-1 mx-2 border text-thewhite rounded-xl hover:cursor-pointer opacity-${
                !isSelected ? '70' : '100'
              } bg-thered ${
                isSelected ? ' text-thewhite' : ' border-theblack'
              }`}
            >
              {tag}
            </span>
          );
        })}
      </div>
      <div className='flex flex-row space-x-2'>
        <input
          type='text'
          className='border-2 border-black rounded-md focus:border-thegreen px-2 py-1 font-md w-9/12 md:w-1/3'
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
    </div>
  );
};

export default AllSadhanasDisplay;
