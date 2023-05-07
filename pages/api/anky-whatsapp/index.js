// pages/api/anky-whatsapp.js
import prisma from '@component/lib/prismaClient';
import { calculateDayIndex } from '@component/lib/functions';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      let users = await prisma.user.findMany({
        select: {
          name: true,
          whatsapp: true,
          timeZone: true,
          sadhanas: {
            where: {
              status: 'active',
            },
            select: {
              title: true,
              content: true,
              targetSessions: true,
              startingTimestamp: true,
            },
          },
        },
      });

      users = users.map(user => {
        user.sadhanas = user.sadhanas.map(sadhana => {
          const dayIndex = calculateDayIndex(
            sadhana.startingTimestamp,
            user.timeZone
          );
          return { ...sadhana, dayIndex };
        });
        return user;
      });

      users = users.filter(x => x.whatsapp);

      res.status(200).json({ users });
    } catch (error) {
      console.error('Error fetching users with active sadhanas:', error);
      res
        .status(500)
        .json({ message: 'Error fetching users with active sadhanas' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
