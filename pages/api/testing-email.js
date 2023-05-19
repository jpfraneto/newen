import { MailtrapClient } from 'mailtrap';

const TOKEN = process.env.MAILTRAP_TOKEN;
const ENDPOINT = 'https://send.api.mailtrap.io/';

const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  const { email, body } = req.body;

  try {
    const sender = {
      email: 'anky@sadhana.lat',
      name: 'Anky The Ape 🐒',
    };
    const recipients = [
      {
        email,
      },
    ];

    await client.send({
      from: sender,
      to: recipients,
      subject: 'Testing Email Functionality',
      text: body,
      category: 'Integration Test',
    });

    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.' });
  }
}
