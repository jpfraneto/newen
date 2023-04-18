import prisma from '../../../../../../lib/prismaClient';

export default async function handler(req, res) {
  const sadhanaId = parseInt(req.query.sadhanaId);
  const dayNumber = parseInt(req.query.dayNumber);

  if (req.method === 'GET') {
    try {
      const sadhanaDay = await prisma.sadhanaDay.findFirst({
        where: {
          sadhanaId: sadhanaId,
          dayIndex: dayNumber,
        },
        include: {
          sessions: {
            include: {
              author: true,
            },
          },
          comments: {
            include: {
              author: true,
            },
          },
        },
      });

      if (sadhanaDay) {
        res.status(200).json({ sadhanaDay });
      } else {
        res
          .status(404)
          .json({ sadhanaDay: undefined, message: 'Sadhana day not found' });
      }
    } catch (error) {
      console.error('Error fetching sadhana day info:', error);
      res.status(500).json({ message: 'Error fetching sadhana day info' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
