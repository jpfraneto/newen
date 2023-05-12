import Link from 'next/link';
import NextImage from 'next/image';

const Image = props => {
  if (props.src) {
    return <NextImage {...props} />;
  }

  //TODO: if the image source is not there, you can set a default source
  //const defaultSrc = "something"

  return <img {...props} src={defaultSrc} />;
};

const SadhanaCard = ({ sadhana }) => {
  sadhana.tags = ['Health', 'Productivity'];
  return (
    <div className='w-fit grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-blue-200 border-black border-2 text-black bg-opacity-60 rounded-lg px-2 py-2 justify-between'>
      <div className='space-y-2 items-center justify-center md:justify-start'>
        <Link href={`/u/${sadhana.author.id}`} passHref>
          <Image
            src={sadhana.author.image || '/images/ankycompressed.png'}
            alt={sadhana.author.name}
            width={64}
            height={64}
            className='rounded-full mx-auto'
          />
        </Link>
        <div className='text-black text-center'>
          <Link
            className='font-bold text-xl text-center'
            href={`/u/${sadhana.author.id}`}
            passHref
          >
            @{sadhana.author.username || sadhana.author.name}
          </Link>
        </div>
      </div>
      <div>
        <Link
          href={`/s/${sadhana.id}`}
          className='font-bold text-xl text-black'
        >
          {sadhana.title}
        </Link>
        <p className='text-black'>Target Sessions: {sadhana.targetSessions}</p>
        <p className='text-black my-1'>
          Starting Date:{' '}
          {new Date(sadhana.startingTimestamp).toLocaleDateString('en-US')}
        </p>
        <div
          className='flex flex-row items-center
        '
        >
          Tags:{' '}
          {sadhana.tags.map((tag, i) => (
            <span
              className={`py-1 px-2 mx-1 border text-thewhite rounded-xl  bg-thepurple border-theblack}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SadhanaCard;
