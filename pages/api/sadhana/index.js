import prisma from 'lib/prisma';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) return res.status(401).json({ message: 'Not logged in' });

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) return res.status(401).json({ message: 'User not found' });

  if (req.method === 'POST') {
    await prisma.sadhana.create({
      data: {
        content: req.body.content,
        title: req.body.title,
        author: {
          connect: { id: user.id },
        },
      },
    });
    res.end();
    return;
  }
}
