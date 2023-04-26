import Comments from '@component/components/Comments';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Righteous, Russo_One } from 'next/font/google';
import { useState } from 'react';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });
const russo = Russo_One({ weight: '400', subsets: ['cyrillic'] });

function SadhanaDayInfo({
  sadhanaDay,
  currentUser,
  sadhanaDayComments,
  setSadhanaDayComments,
}) {
  const router = useRouter();

  return (
    <div className='bg-gray-200 shadow-xl border-2 border-black rounded px-8 pt-6 pb-8 mb-4'>
      <h4 className={`${righteous.className} text-4xl font-bold mb-2`}>
        Day {sadhanaDay.dayIndex}
      </h4>
      <p
        className={`${russo.className} blocktext-gray-700 text-sm font-bold mb-4 text-black`}
      >
        Participants Ready:
      </p>

      <div className='flex items-center mb-4'>
        {sadhanaDay.sessions.map(session => (
          <div key={session.id} className='hover:cursor-pointer'>
            <Image
              src={session.author.image}
              onClick={() => router.push(`/u/${session.authorId}`)}
              alt={session.author.username}
              width={200}
              height={200}
              className='w-12 h-12 rounded-full mx-1'
            />
          </div>
        ))}
      </div>
      <Comments
        sadhanaDayId={sadhanaDay.id}
        sadhanaId={sadhanaDay.sadhanaId}
        dayNumber={sadhanaDay.dayIndex}
        sadhanaDayComments={sadhanaDayComments}
        setSadhanaDayComments={setSadhanaDayComments}
        currentUser={currentUser}
      />
    </div>
  );
}

export default SadhanaDayInfo;
