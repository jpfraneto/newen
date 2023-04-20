import { getServerSession } from 'next-auth/next';
import prisma from '@component/lib/prismaClient';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(200)
      .json({ message: 'No user logged in', sadhanas: [], user: null });
  }

  const userId = session.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      sadhanas: true,
      sadhanaSessions: true,
    },
  });
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

  res.status(200).json({ sadhanas, user });
}
