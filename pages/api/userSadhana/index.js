import { getServerSession } from 'next-auth/next';
import prisma from '@component/lib/prismaClient';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const userId = session.user.id;
  const sadhanas = await prisma.sadhana.findMany({
    where: {
      OR: [
        { authorId: userId },
        {
          participants: {
            some: {
              id: userId,
            },
          },
        },
      ],
    },
    include: {
      author: true,
      participants: true,
    },
  });

  res.status(200).json(sadhanas || []);
}
