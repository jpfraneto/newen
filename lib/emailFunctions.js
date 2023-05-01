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

export async function sendSadhanaCompletionEmail(user, sadhana) {
  const sadhanaCompletionDate = new Date(
    sadhana.startingTimestamp
  ).toLocaleDateString();

  const sender = {
    email: 'anky@sadhana.lat',
    name: 'Anky The Ape 🐒',
  };
  const recipients = [
    {
      email: user.email,
    },
  ];

  try {
    await client.send({
      from: sender,
      to: recipients,
      subject: `🎉 Congratulations on completing your Sadhana!`,
      text: `
Hi ${user.name},

Anky The Ape here, swinging by to congratulate you on completing your Sadhana: "${sadhana.title}"! I knew you had it in you! 🙌

You've proven that consistency is the key, after working on this challenge for ${sadhana.targetSessions} days. I'm super proud of you for finishing this journey today.

Now that you've tasted the sweet fruit of success, let's keep the momentum going! 🍌 Here's what you can do next:

- Join another Sadhana: www.sadhana.lat/s
- Create a new Sadhana: www.sadhana.lat/s/new

Remember, I'm always here to support you on your path to personal growth. So, let's embark on another adventure together and show the world what we can achieve!

Stay playful and consistent,

Anky The Ape 🐒
`,
      category: 'Sadhana Completion',
    });

    console.log('Sadhana completion email sent successfully');
  } catch (error) {
    console.error('Error sending sadhana completion email:', error);
  }
}
