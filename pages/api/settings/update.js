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
  console.log('the user id is: ', userId);
  const { username, name, whatsapp, twitter, instagram, discord, tiktok } =
    req.body;

  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        username,
        name,
        socials: {
          upsert: [
            {
              where: { userId_platform: { userId, platform: 'whatsapp' } },
              update: { link: whatsapp },
              create: {
                platform: 'whatsapp',
                link: whatsapp,
                main: false,
                userId: { connect: { id: userId } },
              },
            },
            {
              where: { userId_platform: { userId, platform: 'twitter' } },
              update: { link: twitter },
              create: {
                platform: 'twitter',
                link: twitter,
                main: false,
                userId: { connect: { id: userId } },
              },
            },
            {
              where: { userId_platform: { userId, platform: 'instagram' } },
              update: { link: instagram },
              create: {
                platform: 'instagram',
                link: instagram,
                main: true,
                userId: { connect: { id: userId } },
              },
            },
            {
              where: { userId_platform: { userId, platform: 'discord' } },
              update: { link: discord },
              create: {
                platform: 'discord',
                link: discord,
                main: false,
                userId: { connect: { id: userId } },
              },
            },
            {
              where: { userId_platform: { userId, platform: 'tiktok' } },
              update: { link: tiktok },
              create: {
                platform: 'tiktok',
                link: tiktok,
                main: false,
                userId: { connect: { id: userId } },
              },
            },
          ],
        },
      },
    });

    res.status(200).json({ message: 'Settings updated successfully.' });
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ message: 'Error updating settings.' });
  }
}
