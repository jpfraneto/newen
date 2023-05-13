import prisma from '@component/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import { calculateDayIndex } from '@component/lib/functions';
import { sendSadhanaCompletionEmail } from '@component/lib/emailFunctions';

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
  const dayIndex = calculateDayIndex(
    sadhana.startingTimestamp,
    session.user.timeZone
  );

  const isLastSession = dayIndex >= sadhana.targetSessions;

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

  // Updating the user points and level. It is important to note that it should become harder to update the user.
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const newPoints = user.points + 10;
  let newLevel = user.level;
  if (newPoints >= user.level * 100) {
    // Assume they need 100 points per level
    newLevel += 1;
  }
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { points: newPoints, level: newLevel },
  });
  console.log('the user earned 10 points for completing this challenge');

  ///
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

  if (isLastSession) {
    await prisma.sadhana.update({
      where: { id: sadhanaId },
      data: { status: 'completed' },
    });

    await sendSadhanaCompletionEmail(session.user, sadhana);
  }

  return { sadhanaSession, createdSadhanaDay };
}
