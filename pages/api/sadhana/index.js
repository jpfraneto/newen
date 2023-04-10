// /api/sadhana.js
import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';

const handler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: 'Not logged in' });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) return res.status(401).json({ message: 'User not found' });

  switch (req.method) {
    case 'POST':
      await createSadhana(req, res, user);
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

const createSadhana = async (req, res, user) => {
  const { content, title, userLimit } = req.body;

  await prisma.sadhana.create({
    data: {
      content,
      title,
      userLimit,
      author: {
        connect: { id: user.id },
      },
    },
  });

  res.status(201).json({ message: 'Sadhana created' });
};

export default handler;
