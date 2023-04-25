import { getServerSession } from 'next-auth/next';
import prisma from '@component/lib/prismaClient';
import { authOptions } from '@component/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const userId = session.user.id;
    const sadhanaId = req.query.sadhanaId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        sadhanaSessions: {
          where: {
            sadhanaId: parseInt(sadhanaId),
          },
        },
      },
    });

    res.status(200).json(user.sadhanaSessions || []);
  } catch (error) {
    console.error('Error fetching user sessions for specific sadhana:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while fetching the sessions.' });
  }
}
