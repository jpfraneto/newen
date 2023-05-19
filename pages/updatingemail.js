import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth].js';

export default function UpdatingEmail() {
  const updateAll = async () => {
    if (!confirm('Do you really want to update the database?')) return;
    try {
      const response = await fetch('/api/master-updater', {
        method: 'GET',
      });

      if (response.ok) {
        alert('Successfully updated!');
      } else {
        alert('Error updating data.');
      }
    } catch (error) {
      console.error('Error in master update:', error);
      alert('Error updating data.');
    }
  };

  return (
    <div>
      <h1>Updating Email</h1>
      <button
        onClick={updateAll}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Update All
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const userId = session?.user?.id;

  // Check if the user's ID matches the provided ID
  if (userId !== 'clgtinf7j0000js08w6041qqk') {
    // If the user's ID doesn't match, redirect them to another page (e.g., homepage)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // If the user's ID matches, load the UpdatingEmail page
  return {
    props: {},
  };
}
