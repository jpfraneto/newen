// /api/sadhana.js
import prisma from '@component/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth].js';
import { sendSadhanaCreationEmail } from '@component/lib/emailFunctions';

const handler = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      return res.status(501).end();
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json({ message: 'Not logged in' });

    await createSadhana(req, res, session);

    res.end();
  } catch (error) {
    console.log('there was the following error here', error);
  }
};

const createSadhana = async (req, res, session) => {
  try {
    const {
      title,
      targetSessions,
      targetSessionDuration,
      periodicity,
      startingTimestamp,
    } = req.body;
    const parsedStartingTimestamp = new Date(startingTimestamp);
    if (isNaN(parsedStartingTimestamp)) {
      return res
        .status(400)
        .json({ message: 'Invalid date format for startingTimestamp' });
    }
    const sadhanaData = {
      title: title,
      targetSessions: parseInt(targetSessions),
      targetSessionDuration: parseInt(targetSessionDuration),
      periodicity: periodicity,
      startingTimestamp: parsedStartingTimestamp.toISOString(),
      author: {
        connect: { id: session.user.id },
      },
      participants: {
        connect: {
          id: session.user.id,
        },
      },
    };

    const prismaResponse = await prisma.sadhana.create({
      data: sadhanaData,
    });

    if (session.user) {
      await sendSadhanaCreationEmail(sadhanaData, session.user);
    }

    res.status(201).json({ message: 'Sadhana created', id: prismaResponse.id });
  } catch (error) {
    console.log('there was an error adding the sadhana to the db', error);
    res.status(500).json({
      message:
        'There was an error adding the sadhana to the DB. Please try again later.',
    });
  }
};

export default handler;
