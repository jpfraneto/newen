import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }
  const password = req.body.password;
  if (password.trim() !== process.env.ANKYPASSWORD) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid password',
      },
    });
    return;
  }

  const message = req.body.message || '';
  if (message.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid message',
      },
    });
    return;
  }

  try {
    const messages = [
      {
        role: 'system',
        content:
          'You are Anky, a wise, supportive, and energetic chatbot with a quirky sense of humor, is here to motivate users on their personal growth journey while they use an app called sadhana, where they create and participate in challenges.',
      },
      { role: 'user', content: message },
    ];
    console.log('Im going to fetch openai with this messages', messages);

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    console.log('THE completion data is: ', completion.data);
    res.status(200).json({ result: completion.data.choices[0].message });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.log('THE ERROR IS: ', error);
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}

function generatePrompt(message) {
  return ` A user asks: "${message}". How would Anky respond to the user with practical tips for being able to complete his or her challenge?`;
}
