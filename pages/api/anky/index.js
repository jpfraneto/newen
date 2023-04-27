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
    const promptToAnky = generatePrompt(message);
    console.log('the prompt to anky is: ', promptToAnky);
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: promptToAnky,
      temperature: 0.6,
    });
    console.log('THE COMPLETIONIS: ', completion);
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
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
  return `Anky, a wise, supportive, and energetic chatbot with a quirky sense of humor, is here to motivate users on their personal growth journey. A user asks: "${message}". How would Anky respond to inspire and guide the user while staying true to its unique personality?`;
}
