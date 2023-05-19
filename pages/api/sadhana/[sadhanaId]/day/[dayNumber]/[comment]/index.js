// /api/sadhana.js
import prisma from '@component/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth].js';

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { sadhanaId, dayNumber } = req.query;

    const session = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json({ message: 'Not logged in' });

    const userId = session.user.id;
    const newCommentData = req.body;
    const { sadhanaDayId } = req.body;

    const newComment = await prisma.comment.create({
      data: {
        content: newCommentData.content,
        author: { connect: { id: userId } },
        sadhanaDay: {
          connect: { id: sadhanaDayId },
        },
      },
      include: {
        author: true,
      },
    });
    console.log('the new comment was added to the db');

    res.status(201).json({ comment: newComment });
  } catch (error) {
    console.log('there was an error adding the comment to the db', error);
    res
      .status(500)
      .json({ error: 'An error occurred while adding the comment' });
  }
};

export default handler;
