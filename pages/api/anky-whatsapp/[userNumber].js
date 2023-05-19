// pages/api/lastsessions.js
import prisma from '@component/lib/prismaClient';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const lastSessions = await prisma.sadhanaSession.findMany({
        take: 20,
        orderBy: {
          completedAt: 'desc',
        },
        include: {
          author: true,
          sadhana: true,
          sadhanaDay: true,
        },
      });

      res.status(200).json(lastSessions);
    } catch (error) {
      console.error('Error fetching last sessions:', error);
      res.status(500).json({ message: 'Error fetching last sessions' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
