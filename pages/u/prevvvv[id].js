import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Inter, Righteous, Rajdhani, Russo_One } from 'next/font/google';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

const righteous = Righteous({ weight: '400', subsets: ['latin'] });

const fetcher = url => fetch(url).then(res => res.json());

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: user,
    error: userError,
    useLoading,
  } = useSWR(id ? `/api/user?id=${id}` : null, fetcher);
  const { data: createdSadhanas, error: createdError } = useSWR(
    id ? `/api/createdSadhanas?userId=${id}` : null,
    fetcher
  );
  // const { data: participatedSadhanas, error: participatedError } = useSWR(
  //   id ? `/api/participatedSadhanas?userId=${id}` : null,
  //   fetcher
  // );

  const getStatus = startDate => {
    const currentDate = new Date();
    const start = new Date(startDate);

    if (currentDate < start) {
      const distance = formatDistanceToNow(start, { addSuffix: true });
      return `Starting in ${distance}`;
    } else {
      return 'In progress';
    }
  };

  if (useLoading) {
    return (
      <div className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen'>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen'>
        <p>User doesnt exist yet.</p>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 min-h-screen'>
      <div className=' w-8/12 m-auto py-8 text-white'>
        <h4
          className={`${righteous.className} text-2xl md:text-5xl w-full font-bold`}
        >
          @{user?.username || user.name}
        </h4>
        <h2 className='text-xl font-semibold mb-2'>Challenges:</h2>
        <ul>
          {createdSadhanas?.map(sadhana => (
            <li key={sadhana.id}>
              <Link href={`/s/${sadhana.id}`}>{sadhana.title}</Link> -{' '}
              <span className='text-bold'>
                {getStatus(sadhana.startingTimestamp)}
              </span>
            </li>
          ))}
        </ul>

        <div>
          {' '}
          <Link
            className='mt-4 inline-block bg-gradient-to-r from-black via-black to-black text-white font-bold text-2xl px-6 py-3 mx-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
            href={`/s/new`}
          >
            Add Challenge
          </Link>
          <Link
            className='mt-4 inline-block bg-gradient-to-r from-black via-black to-black text-white font-bold text-2xl px-6 py-3 mx-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
            href={`/s`}
          >
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
