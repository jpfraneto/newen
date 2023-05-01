import { MailtrapClient } from 'mailtrap';

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = 'https://send.api.mailtrap.io/';
const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

export async function sendSadhanaCreationEmail(sadhana, userEmail) {
  const videoLink = 'https://www.youtube.com/watch?v=tuLqwaZ86Uo';

  const sender = {
    email: 'anky@sadhana.lat',
    name: 'Anky The Ape 🐒',
  };
  const recipients = [
    {
      email: userEmail,
    },
  ];

  try {
    await client.send({
      from: sender,
      to: recipients,
      subject: '🎉 Congratulations on starting a new Sadhana!',
      text: `
Hey there!

I am Anky The Ape, and I'm here to help you be consistent with your new Sadhana, "${
        sadhana.title
      }".

Your Sadhana details:
- Target sessions: ${sadhana.targetSessions}
- Target session duration: ${sadhana.targetSessionDuration} minutes
- Starting date: ${new Date(sadhana.startingTimestamp).toLocaleDateString()}

Have in mind that this platform is being developed every day by me, so if you have any feedback that can help me make it better, please answer to this email with it.

Also, click the link below to add your WhatsApp number to your profile and receive daily updates from me:
https://www.sadhana.lat/profile

Remember, Sadhana is here to help you achieve your goals. We will be with you every step of the way, encouraging you to stay on track and making your journey enjoyable.

Let's make these next 10 days amazing! 🚀

Stay consistent,
Anky The Ape 🐒
`,
      category: 'Sadhana Creation',
    });

    console.log('Sadhana creation email sent successfully');
  } catch (error) {
    console.error('Error sending sadhana creation email:', error);
  }
}
