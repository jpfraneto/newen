import prisma from '@component/lib/prismaClient';

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
