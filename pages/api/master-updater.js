import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import prisma from '@component/lib/prismaClient';

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (req.method === 'GET') {
    if (session && session.user.id === 'clgtinf7j0000js08w6041qqk') {
      try {
        // Function to update pending sadhanas
        await updatePendingSadhanas();

        // Function to send WhatsApp messages to users
        // await sendWhatsappMessages();

        res.status(200).json({ message: 'Successfully updated!' });
      } catch (error) {
        console.error('Error in master update:', error);
        res.status(500).json({ message: 'Error updating data.' });
      }
    } else {
      res.status(403).json({ message: "You don't have permission to update." });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}

async function updatePendingSadhanas() {
  try {
    // Get the current date and time
    const now = new Date();

    // Query all sadhanas with the 'pending' state
    const pendingSadhanas = await prisma.sadhana.findMany({
      where: {
        status: 'pending',
      },
    });

    // Loop through each pending sadhana
    for (const sadhana of pendingSadhanas) {
      if (new Date(sadhana.startingTimestamp) <= now) {
        // Update the sadhana state to 'active'
        await prisma.sadhana.update({
          where: {
            id: sadhana.id,
          },
          data: {
            status: 'active',
          },
        });
      }
    }
  } catch (error) {
    console.error('Error updating pending sadhanas:', error);
    throw error;
  }
}

async function sendWhatsappMessages() {
  // Your logic to send WhatsApp messages to users
}
