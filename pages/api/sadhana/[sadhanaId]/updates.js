// /pages/api/sadhana/participate.js
import { getServerSession } from 'next-auth/next';
import prisma from '@component/lib/prismaClient';
import { authOptions } from '@component/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'GET') {
    try {
      // Get the user session
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }

      // Fetch all the sadhana updates for the specified sadhana ID
      const sadhanaUpdates = await prisma.sadhanaUpdate.findMany({
        where: {
          sadhanaId: parseInt(id),
        },
      });

      res.status(200).json(sadhanaUpdates);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
