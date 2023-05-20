// pages/api/sadhana/[id].js
import prisma from '@component/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
  const sadhanaId = parseInt(req.query.sadhanaId);
  const session = await getServerSession(req, res, authOptions);

  try {
    if (req.method === 'DELETE') {
      try {
        const userId = session.user.id;
        // Delete associated SadhanaSessions
        await prisma.sadhanaSession.deleteMany({
          where: {
            AND: [{ sadhanaId: sadhanaId }, { authorId: userId }],
          },
        });

        // Disconnect the User from the Sadhana
        await prisma.user.update({
          where: { id: userId },
          data: {
            participatedSadhanas: {
              disconnect: { id: sadhanaId },
            },
            sadhanas: {
              disconnect: { id: sadhanaId },
            },
          },
        });

        // Disconnect the Sadhana from the User
        await prisma.sadhana.update({
          where: { id: sadhanaId },
          data: {
            participants: {
              disconnect: { id: userId },
            },
          },
        });

        res.status(200).json({
          message: 'The sadhana was successfully deleted from the user',
        });
      } catch (error) {
        console.log('the error is: ', error);
        res
          .status(500)
          .send({ error: 'An error occurred while deleting the sadhana.' });
      }
    } else if (req.method === 'GET') {
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
    }
  } catch (error) {
    console.log('There was an error', error);
    res.status(500);
  }
}
