import prisma from '@component/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth]';

async function getUserById(id) {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  return user;
}

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const { id } = req.query;
      const user = await getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } else if (req.method === 'PUT') {
      const session = await getServerSession(req, res, authOptions);

      if (!session) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const { username, name, whatsapp, twitter, instagram, discord, tiktok } =
        req.body;

      try {
        await prisma.user.update({
          where: { id: session.user.id },
          data: {
            username,
            name,
            whatsapp,
            socials: {
              upsert: [
                {
                  where: {
                    platform_userId: {
                      platform: 'twitter',
                      userId: session.user.id,
                    },
                  },
                  update: { link: twitter },
                  create: { platform: 'twitter', link: twitter, main: true },
                },
                {
                  where: {
                    platform_userId: {
                      platform: 'instagram',
                      userId: session.user.id,
                    },
                  },
                  update: { link: instagram },
                  create: {
                    platform: 'instagram',
                    link: instagram,
                    main: true,
                  },
                },
                {
                  where: {
                    platform_userId: {
                      platform: 'discord',
                      userId: session.user.id,
                    },
                  },
                  update: { link: discord },
                  create: { platform: 'discord', link: discord, main: true },
                },
                {
                  where: {
                    platform_userId: {
                      platform: 'tiktok',
                      userId: session.user.id,
                    },
                  },
                  update: { link: tiktok },
                  create: { platform: 'tiktok', link: tiktok, main: true },
                },
              ],
            },
          },
        });

        res.status(200).json({ message: 'Settings updated successfully' });
      } catch (error) {
        console.error('Error updating user settings:', error);
        res.status(500).json({ message: 'Error updating user settings' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the data.' });
  }
}
