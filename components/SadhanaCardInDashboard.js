import Link from 'next/link';
import NextImage from 'next/image';
import { IoIosPeople } from 'react-icons/io';
import { GiStairsGoal } from 'react-icons/gi';
import { BsFillCalendarCheckFill } from 'react-icons/bs';
import { AiFillClockCircle } from 'react-icons/ai';

const Image = props => {
  if (props.src) {
    return <NextImage {...props} />;
  }

  //TODO: if the image source is not there, you can set a default source
  //const defaultSrc = "something"

  return <img {...props} src={defaultSrc} />;
};

const SadhanaCardInDashboard = ({ sadhana }) => {
  const date = new Date(sadhana.startingTimestamp);
  const timeZoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
  const localDate = new Date(date.getTime() + timeZoneOffset);
  return (
    <div className=' w-full h-fit md:h-28 pt-4 pb-1 flex justify-between border-black border-b text-black px-2 justify-left hover:bg-thegreen'>
      <div className='flex flex-col w-16 overflow-x-hidden items-start justify-center md:justify-start'>
        <Link href={`/u/${sadhana.author.id}`} passHref>
          <Image
            src={sadhana.author.image || '/images/ankycompressed.png'}
            alt={sadhana.author.name}
            width={64}
            height={64}
            className='rounded-xl mx-auto my-0 border border-theblack'
          />
        </Link>
        <div className='text-left'>
          <Link
            className='font-theblack text-left'
            href={`/u/${sadhana.author.id}`}
            passHref
          >
            @{sadhana.author.username || sadhana.author.name?.split(' ')[0]}
          </Link>
        </div>
      </div>
      <div className='px-4 w-full md:w-11/12 flex flex-row md:justify-between items-left'>
        <div className='flex flex-col md:flex-row md:justify-between w-full'>
          <div className='flex flex-col text-left  mr-auto '>
            <p
              href={`/s/${sadhana.id}`}
              className='font-bold text-xl text-black mb-0'
            >
              {sadhana.title}
            </p>
            <p className='hidden md:block text-black max-w-xl'>
              {sadhana.content.slice(0, 100)}...
            </p>
          </div>
          <div className='flex mr-auto md:mr-0 md:ml-auto mt-1 justify-start items-center md:pr-2'>
            <div className='flex flex-col items-center'>
              <AiFillClockCircle size={30} />
              {sadhana.targetSessionDuration}
            </div>
            <div className='flex ml-2 flex-col items-center'>
              <GiStairsGoal size={30} />
              {sadhana.targetSessions}
            </div>
            <div className='flex ml-2 flex-col items-center'>
              <IoIosPeople size={30} />
              {sadhana.participants.length}
            </div>
            <div className='flex ml-2 flex-col items-center'>
              <BsFillCalendarCheckFill size={30} />
              <span>daily</span>
            </div>
            <div className='flex ml-4 flex-col items-center text-center'>
              <span>
                {localDate.toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SadhanaCardInDashboard;
