import prisma from '@component/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { calculateDayIndex } from '@component/lib/functions';

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
      3,
      session
    );

    res.status(200).json(sadhanaSession);
  } catch (error) {
    console.error('Error creating sadhana session:', error);
    res.status(500).json({ message: 'Error creating sadhana session.' });
  }
};

export default handler;

async function createSadhanaSession(
  sadhanaId,
  userId,
  completedAt,
  notes,
  feeling,
  session
) {
  // Fetch the sadhana
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
  console.log('wa', sadhanaSession, session.user);
  sadhanaSession.author = {
    image: session.user.image,
    username: session.user.username || session.user.name || '',
  };
  if (createdSadhanaDay.comments?.length > 0) {
  } else {
    createdSadhanaDay.comments = [];
  }
  if (createdSadhanaDay.sessions?.length > 0) {
    createdSadhanaDay.sessions = [
      ...createdSadhanaDay.sessions,
      sadhanaSession,
    ];
  } else {
    createdSadhanaDay.sessions = [sadhanaSession];
  }

  return { sadhanaSession, createdSadhanaDay };
}
