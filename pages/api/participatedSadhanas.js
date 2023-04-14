import prisma from '@component/lib/prismaClient';

async function getParticipatedSadhanas(userId) {
  const participatedSadhanas = await prisma.sadhana.findMany({
    where: {
      participants: {
        some: {
          id: userId,
        },
      },
      isPrivate: false,
    },
    orderBy: {
      startingTimestamp: 'asc',
    },
  });

  return participatedSadhanas;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { userId } = req.query;
      const participatedSadhanas = await getParticipatedSadhanas(userId);
      res.status(200).json(participatedSadhanas);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the data.' });
  }
}
