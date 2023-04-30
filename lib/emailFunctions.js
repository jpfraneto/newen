import nodemailer from 'nodemailer';

export async function sendSadhanaCompletionEmail(user, sadhana) {
  try {
    // Create a Nodemailer transporter using your email service and credentials
    const transporter = nodemailer.createTransport({
      service: 'your-email-service', // e.g., 'gmail'
      auth: {
        user: 'your-email-username', // e.g., 'anky@sadhana.lat'
        pass: 'your-email-password',
      },
    });

    // Set up the email template
    const mailOptions = {
      from: '"Anky The Ape" <anky@sadhana.lat>',
      to: user.email,
      subject: `Congratulations on completing the "${sadhana.title}" Sadhana! 🎉`,
      text: `Hey there, ${user.name || user.username}!

It's your playful friend Anky The Ape from another dimension! 🐵

I'm excited to let you know that you've just completed the "${
        sadhana.title
      }" Sadhana! Great job on staying consistent and working on becoming the best version of yourself! 🌟

It's time to celebrate your accomplishment! 🎉 But remember, the journey doesn't end here. There are plenty more Sadhanas waiting for you to explore and conquer.

To join a new Sadhana, just swing on over to https://www.sadhana.lat/s/new and pick your next challenge! 🌱

Stay playful and keep on growing!

Your friend,
Anky The Ape 🐵`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending Sadhana completion email:', error);
  }
}
