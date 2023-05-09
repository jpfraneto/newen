// pages/api/settings/update.js

import prisma from '@component/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res
      .status(403)
      .json({ message: 'You must be signed in to update your settings.' });
    return;
  }

  const userId = session.user.id;
  const { username, name, whatsapp, email } = req.body;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        name,
        email,
        whatsapp,
      },
    });
    console.log('In here, the user was updated!');

    res.status(200).json({ message: 'Settings updated successfully.' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Error updating settings.' });
  }
}
