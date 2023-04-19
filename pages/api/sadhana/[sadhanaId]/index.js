// pages/api/sadhana/[id].js
import prisma from '@component/lib/prismaClient';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }
  const { sadhanaId } = req.query;

  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}
