// /pages/api/sadhana/participate.js
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { sadhanaId } = req.body;

    try {
      const updatedSadhana = await prisma.sadhana.update({
        where: { id: parseInt(sadhanaId) },
        data: {
          participants: {
            connect: { id: session.user.id },
          },
        },
        include: {
          participants: true,
        },
      });

      return res.status(200).json(updatedSadhana);
    } catch (error) {
      console.error('Error participating in sadhana:', error);
      res.status(500).json({ message: 'Error participating in sadhana' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
