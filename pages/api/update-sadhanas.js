import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@component/lib/prismaClient';

const updateSadhanasStatus = async sadhanas => {
  const currentDate = new Date();
  return sadhanas.map(sadhana => {
    const { startingTimestamp, targetSessions } = sadhana;
    const startDate = new Date(startingTimestamp);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + targetSessions);

    if (startDate > currentDate) {
      sadhana.status = 'pending';
    } else if (currentDate >= startDate && currentDate <= endDate) {
      sadhana.status = 'active';
    } else {
      sadhana.status = 'completed';
    }

    return sadhana;
  });
};

export default async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  const sadhanas = await prisma.sadhana.findMany();
  const updatedSadhanas = await updateSadhanasStatus(sadhanas);

  for (const updatedSadhana of updatedSadhanas) {
    await prisma.sadhana.update({
      where: { id: updatedSadhana.id },
      data: { status: updatedSadhana.status },
    });
  }

  res.status(200).json({ message: 'Sadhanas updated successfully' });
};
