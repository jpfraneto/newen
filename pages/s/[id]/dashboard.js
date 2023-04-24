// pages/sadhana/[id]/dashboard.js
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { useEffect, useState } from 'react';

const SadhanaDashboard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const { id } = router.query;
  const [sadhana, setSadhana] = useState(null);
  const [updateContent, setUpdateContent] = useState('');

  // Fetch the sadhana data and check if the current user is the author
  useEffect(() => {
    const fetchSadhanaData = async () => {
      // Fetch the sadhana data
      if (!id || status === 'loading') return;
      if (status === 'unauthenticated') return router.push(`/s/${id}`);

      const sadhanaData = await fetch(`/api/sadhana/${id}`).then(res =>
        res.json()
      );
      // Redirect if the user is not the author of the sadhana

      if (sadhanaData.sadhana.authorId !== session?.user.id) {
        alert('you cant access this route');
        router.push(`/s/${id}`);
      } else {
        console.log('in here');
        setSadhana(sadhanaData.sadhana);
      }
    };
    fetchSadhanaData();
  }, [id, session, router, status]);

  const handleSubmitUpdate = async e => {
    e.preventDefault();

    const response = await fetch(`/api/sadhana/${id}/sadhanaUpdate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: updateContent,
        dayIndex: sadhana.activeDay,
      }),
    });

    if (response.ok) {
      // Redirect to the sadhana page or show a success message
    } else {
      // Show an error message
    }
  };

  if (!sadhana) return <p>Loading...</p>;

  return (
    // Inside the SadhanaDashboard component
    <div className=' container mx-auto bg-white p-6 rounded-md shadow-md'>
      <h2 className='text-2xl font-semibold mb-4'>
        Submit Today&apos;s Update
      </h2>
      <button onClick={() => console.log(sadhana)}>print</button>
      <form onSubmit={handleSubmitUpdate}>
        <div className='mb-4'>
          <label
            htmlFor='updateContent'
            className='block text-sm font-medium text-gray-700'
          >
            Update Content
          </label>
          <textarea
            id='updateContent'
            name='updateContent'
            rows='3'
            className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
            value={updateContent}
            onChange={e => setUpdateContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type='submit'
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Submit Update
        </button>
      </form>
    </div>
  );
};

export default SadhanaDashboard;
