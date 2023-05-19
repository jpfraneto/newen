// pages/api/sadhana/[id].js
import prisma from '@component/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
  const sadhanaId = req.query.sadhanaId;
  const session = await getServerSession(req, res, authOptions);

  try {
    if (req.method === 'GET') {
      const sadhana = await prisma.sadhana.findUnique({
        where: { id: parseInt(sadhanaId) },
        include: {
          author: true,
          updates: true,
        },
      });

      if (!sadhana) {
        res.status(404).json({ message: 'Sadhana not found' });
        return;
      }

      res.status(200).json({ sadhana });
    } else if (req.method === 'DELETE') {
      if (!session) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // First, delete the related sadhana sessions
      await prisma.sadhanaSession.deleteMany({
        where: {
          sadhanaId: parseInt(sadhanaId),
        },
      });

      // Find sadhana days to delete related comments
      const sadhanaDays = await prisma.sadhanaDay.findMany({
        where: {
          sadhanaId: parseInt(sadhanaId),
        },
        select: {
          id: true,
        },
      });

      // Delete comments related to the sadhana days
      for (const sadhanaDay of sadhanaDays) {
        await prisma.comment.deleteMany({
          where: {
            sadhanaDayId: sadhanaDay.id,
          },
        });
      }

      // Delete the related sadhana days
      await prisma.sadhanaDay.deleteMany({
        where: {
          sadhanaId: parseInt(sadhanaId),
        },
      });

      // Then, delete the sadhana
      await prisma.sadhana.delete({
        where: {
          id: parseInt(sadhanaId),
        },
      });
      res.status(200).json({});
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('This is the error eliminating the sadhana.', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
