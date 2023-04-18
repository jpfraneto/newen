// /api/sadhana.js
import prisma from '@component/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth].js';

const handler = async (req, res) => {
  let user;
  try {
    if (req.method !== 'POST') {
      return res.status(501).end();
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json({ message: 'Not logged in' });

    switch (session.user.oauthProvider) {
      case 'twitter':
        user = await prisma.user.findUnique({
          where: {
            id: session.user.id,
          },
        });
        break;
      case 'google':
        user = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        });
        break;
    }

    if (!user) return res.status(401).json({ message: 'User not found' });

    await createSadhana(req, res, user);

    res.end();
  } catch (error) {
    console.log('there was the following error here', error);
  }
};

const createSadhana = async (req, res, user) => {
  try {
    const {
      title,
      content,
      userLimit,
      targetSessions,
      targetSessionDuration,
      periodicity,
      startingTimestamp,
      isPrivate,
    } = req.body;

    const parsedStartingTimestamp = new Date(startingTimestamp);
    if (isNaN(parsedStartingTimestamp)) {
      return res
        .status(400)
        .json({ message: 'Invalid date format for startingTimestamp' });
    }
    const sadhanaData = {
      title: title,
      content: content,
      userLimit: parseInt(userLimit),
      targetSessions: parseInt(targetSessions),
      targetSessionDuration: parseInt(targetSessionDuration),
      periodicity: periodicity,
      startingTimestamp: parsedStartingTimestamp.toISOString(),
      isPrivate: isPrivate,
      author: {
        connect: { id: user.id },
      },
      participants: {
        connect: {
          id: user.id,
        },
      },
    };

    console.log('Data being passed to prisma.sadhana.create:', sadhanaData);

    const prismaResponse = await prisma.sadhana.create({
      data: sadhanaData,
    });

    console.log('the prisma response is: ', prismaResponse);

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
