import { useState, useEffect } from 'react';
import BiggerLayout from './BiggerLayout';
import Button from './Button';
import { BiSearchAlt } from 'react-icons/bi';
import Link from 'next/link';
import SadhanaCard from './SadhanaCard';
import { Titillium_Web } from 'next/font/google';

const titilium = Titillium_Web({ weight: '400', subsets: ['latin'] });

const AllSadhanasDisplay = ({ sadhanas }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSadhanas, setFilteredSadhanas] = useState(sadhanas);
  const [selectedTags, setSelectedTags] = useState([]);

  const tags = [
    'Creativity',
    'Diet',
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

  const chooseTag = () => {};

  return (
    <div className='px-2'>
      <h2
        className={`${titilium.className} text-5xl mt-8 mb-2 text-center `}
        href='/'
      >
        welcome to sadhana
      </h2>
      <p className='text-center mb-1'>
        What do you want to challenge yourself with?
      </p>
      <div className='flex flex-row flex-wrap mt-0 justify-center mb-2'>
        {tags.map((tag, i) => {
          return (
            <span
              key={i}
              onClick={() => alert('This will be available soon.')}
              className={`px-2 py-1 md:px-4 md:py-4 m-2 border text-theblack text-center hover:bg-theblack hover:text-thewhite border-theblack w-40 rounded-xl hover:cursor-pointer `}
            >
              {tag}
            </span>
          );
        })}
      </div>
      <div className='flex justify-center items-center flex-row space-x-2'>
        <input
          type='text'
          className='border border-black rounded-md focus:border-thegreen px-4 py-2 font-xl w-10/12 md:w-6/12'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder='Search for sadhanas...'
        />
        <Button
          buttonColor='bg-thewhite hover:bg-thegreener'
          buttonText={<BiSearchAlt />}
          buttonAction={() => alert(`Hello there 👀`)}
        />
      </div>
      <div className='sm:px-16 mt-4 flex flex-wrap justify-between'>
        {filteredSadhanas.map(sadhana => (
          <SadhanaCard key={sadhana.id} sadhana={sadhana} />
        ))}
      </div>
    </div>
  );
};

export default AllSadhanasDisplay;
