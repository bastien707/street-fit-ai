import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  try {
    const baseCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${req.body.prompt}\n`,
      temperature: 0.7,
      max_tokens: 2048,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({output: basePromptOutput});
    
  } catch (error) {
      console.log(error);
      res.status(500).json({error: error.message});
  }
};

export default generateAction;
