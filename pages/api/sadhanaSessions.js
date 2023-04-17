import prisma from '@component/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }
  const { userId, sadhanaId, completedAt } = req.body;

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Not logged in' });
    }

    const sadhanaSession = await createSadhanaSession(
      req.body.sadhanaId,
      req.body.userId,
      req.body.completedAt,
      'Wena compare',
      3
    );

    // const sadhanaSession = await prisma.sadhanaSession.create({
    //   data: {
    //     completedAt: new Date(completedAt),
    //     sessionIndex: 8, // Add the required sessionIndex field
    //     startingTimestamp: new Date(), // Add the required startingTimestamp field
    //     finishedTimestamp: new Date(), // Add the required finishedTimestamp field
    //     feeling: 5, // Add the required feeling field, you can change it according to your needs
    //     sadhana: {
    //       connect: {
    //         id: sadhanaId,
    //       },
    //     },
    //     author: {
    //       connect: {
    //         id: userId,
    //       },
    //     },
    //   },
    // });

    console.log('the sadhana session element is: ', sadhanaSession);

    res.status(200).json(sadhanaSession);
  } catch (error) {
    console.error('Error creating sadhana session:', error);
    res.status(500).json({ message: 'Error creating sadhana session.' });
  }
};

export default handler;

function calculateDayIndex(startingTimestamp) {
  const currentDate = new Date();
  const startDate = new Date(startingTimestamp);
  const timeDifference = currentDate - startDate;
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
}

async function createSadhanaSession(
  sadhanaId,
  userId,
  completedAt,
  notes,
  feeling
) {
  // Fetch the sadhana
  console.log('the sadhana id is: ', sadhanaId);
  const sadhana = await prisma.sadhana.findUnique({ where: { id: sadhanaId } });

  if (!sadhana) {
    throw new Error('Sadhana not found');
  }

  // Calculate the current day index of the Sadhana
  const dayIndex = calculateDayIndex(sadhana.startingTimestamp);

  // Find or create the SadhanaDay with the calculated day index
  const sadhanaDay = await prisma.sadhanaDay.findFirst({
    where: {
      sadhanaId: sadhanaId,
      dayIndex: dayIndex,
    },
  });

  const createdSadhanaDay = sadhanaDay
    ? sadhanaDay
    : await prisma.sadhanaDay.create({
        data: {
          dayIndex: dayIndex,
          sadhana: { connect: { id: sadhanaId } },
        },
      });

  // Create a new SadhanaSession and associate it with the found or created SadhanaDay
  const sadhanaSession = await prisma.sadhanaSession.create({
    data: {
      completedAt: completedAt,
      author: { connect: { id: userId } },
      sadhana: { connect: { id: sadhanaId } },
      sadhanaDay: { connect: { id: createdSadhanaDay.id } },
      notes: notes,
      sessionIndex: dayIndex,
      feeling: feeling,
    },
  });

  return sadhanaSession;
}
