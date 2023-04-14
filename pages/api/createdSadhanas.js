import prisma from '@component/lib/prismaClient';

async function getCreatedSadhanas(userId) {
  const sadhanas = await prisma.sadhana.findMany({
    where: {
      authorId: userId,
      isPrivate: false,
    },
    orderBy: {
      startingTimestamp: 'asc',
    },
  });

  return sadhanas;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { userId } = req.query;
      const createdSadhanas = await getCreatedSadhanas(userId);
      res.status(200).json(createdSadhanas);
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
