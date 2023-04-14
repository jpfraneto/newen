import React from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

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
      <div className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen'>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen'>
        <p>User doesnt exist yet.</p>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen'>
      <div className=' w-8/12 m-auto py-8 text-black'>
        <h1 className='text-2xl font-semibold mb-4'>
          @{user?.username}&apos;s profile
        </h1>
        <h2 className='text-xl font-semibold mb-2'>Sadhanas:</h2>
        <ul>
          {createdSadhanas?.map(sadhana => (
            <li key={sadhana.id}>
              <Link href={`/sadhana/${sadhana.id}`}>{sadhana.title}</Link> -{' '}
              <span className='text-bold'>
                {getStatus(sadhana.startingTimestamp)}
              </span>
            </li>
          ))}
        </ul>
        {/* <h2 className='text-xl font-semibold mb-2 mt-6'>
          Participated Sadhanas:
        </h2>
        <ul>
          {participatedSadhanas?.map(sadhana => (
            <li key={sadhana.id}>
              <Link href={`/sadhana/${sadhana.id}`}>{sadhana.title}</Link> -
              Status: {getStatus(sadhana.startingTimestamp)}
            </li>
          ))}
        </ul> */}

        <Link
          className='mt-4 inline-block bg-gradient-to-r from-black via-black to-black text-white font-bold text-2xl px-6 py-3 mx-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out'
          href={`/sadhana/new`}
        >
          Add Sadhana
        </Link>
      </div>
    </div>
  );
};

export default UserPage;
