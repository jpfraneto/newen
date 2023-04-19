import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth].js';
import prisma from '@component/lib/prismaClient';

export default async function handler(req, res) {
  const { id } = req.query;
  const { content, dayIndex } = req.body;

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const sadhana = await prisma.sadhana.findUnique({
      where: { id: parseInt(id) },
    });

    if (sadhana.authorId !== session.user.id) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    if (dayIndex !== sadhana.activeDay) {
      res.status(400).json({ message: 'Invalid day for update' });
      return;
    }

    await prisma.sadhanaUpdate.create({
      data: {
        content,
        dayIndex,
        sadhana: {
          connect: { id: sadhana.id },
        },
      },
    });

    res.status(200).json({ message: 'Update added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
