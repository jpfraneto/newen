import prisma from '@component/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  console.log('IN HERE!', req.body);
  const { userId, sadhanaId, completedAt } = req.body;

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Not logged in' });
    }

    const sadhanaSession = await prisma.sadhanaSession.create({
      data: {
        completedAt: new Date(completedAt),
        sessionIndex: 8, // Add the required sessionIndex field
        startingTimestamp: new Date(), // Add the required startingTimestamp field
        finishedTimestamp: new Date(), // Add the required finishedTimestamp field
        feeling: 5, // Add the required feeling field, you can change it according to your needs
        sadhana: {
          connect: {
            id: sadhanaId,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    console.log('the sadhana session element is: ', sadhanaSession);

    res.status(200).json(sadhanaSession);
  } catch (error) {
    console.error('Error creating sadhana session:', error);
    res.status(500).json({ message: 'Error creating sadhana session.' });
  }
};

export default handler;
