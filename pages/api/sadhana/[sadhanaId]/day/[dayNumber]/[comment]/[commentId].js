// /api/sadhana.js
import prisma from '@component/lib/prismaClient';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@component/pages/api/auth/[...nextauth].js';

const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { sadhanaId, dayNumber, commentId, sadhanaDayId } = req.query;

    const session = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json({ message: 'Not logged in' });

    const userId = session.user.id;
    const updatedCommentData = req.body;

    const existingComment = await prisma.comment.findUnique({
      where: { id: parseInt(commentId) },
      include: { author: true },
    });

    if (existingComment.author.id !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(commentId) },
      data: {
        content: updatedCommentData.content,
      },
      include: {
        author: true,
      },
    });
    console.log('the comment was edited.');

    res.status(200).json({ comment: updatedComment });
  } catch (error) {
    console.log('there was an error editing the comment in the db', error);
    res
      .status(500)
      .json({ error: 'An error occurred while updating the comment' });
  }
};

export default handler;
