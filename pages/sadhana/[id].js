import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import Image from 'next/image';

const prisma = new PrismaClient();

export default function SadhanaDetail({ sadhana }) {
  const router = useRouter();
  const { id } = router.query;
  const { session } = useSession();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const participateInSadhana = async () => {
    try {
      const response = await fetch('/api/sadhana/participate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sadhanaId: id }),
      });

      if (response.ok) {
        alert('You have successfully joined the sadhana!');
        router.reload();
      } else {
        alert('Error joining the sadhana');
      }
    } catch (error) {
      console.error('Error joining the sadhana:', error);
      alert('Error joining the sadhana');
    }
  };

  return (
    <div className='p-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 min-h-screen  text-black'>
      <div className='container text-center'>
        {' '}
        <h1 className='text-3xl font-semibold mb-4'>Sadhana</h1>
        <div className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
          <h2 className='text-xl font-semibold mb-4'>{sadhana.title}</h2>
          <p>{sadhana.content}</p>
          <p>
            Author:{' '}
            <Link
              className='text-blue-500 hover:underline'
              href={`/u/${sadhana.author.username}`}
            >
              {sadhana.author.name}
            </Link>
          </p>
          <p>Target Sessions: {sadhana.targetSessions}</p>
          <p>Target Session Duration: {sadhana.targetSessionDuration}</p>
          <p>Periodicity: {sadhana.periodicity}</p>
          <p>
            Starting Timestamp: {new Date(sadhana.startingTimestamp).getTime()}
          </p>
          <p>
            Users: {sadhana.participants?.length}/{sadhana.userLimit}
          </p>
          <p>Is Private: {sadhana.isPrivate ? 'Yes' : 'No'}</p>
          <div className='flex items-center mb-4'>
            {sadhana.participants?.map(participant => (
              <Image
                key={participant.id}
                src={participant.image}
                alt={participant.name}
                className='w-8 h-8 rounded-full mr-2'
                title={participant.name}
              />
            ))}
          </div>
          {session && (
            <button
              onClick={participateInSadhana}
              className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            >
              Participate in Sadhana
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const sadhanas = await prisma.sadhana.findMany();

  const paths = sadhanas.map(sadhana => ({
    params: { id: sadhana.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const sadhana = await prisma.sadhana.findUnique({
    where: { id: parseInt(params.id) },
    include: {
      author: true,
    },
  });

  return {
    props: {
      sadhana: JSON.parse(JSON.stringify(sadhana)),
    },
    revalidate: 60,
  };
}
