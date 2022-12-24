import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

let basePromptPrefix = "Could you generate a calisthenic workout based on the following parameters\n My fitness level: ";

const generateAction = async (req, res) => {
    basePromptPrefix += req.body.level += ".\n";
    basePromptPrefix += "My equipment: ";
    basePromptPrefix += req.body.equipment + ".\n";
    basePromptPrefix += "My goals: ";
    basePromptPrefix += req.body.goals + ".\n";
    basePromptPrefix += "Divide the answer into 3 parts: warmup, main workout, and cooldown.";
    const baseCompletion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${basePromptPrefix}\n`,
        temperature: 0.7,
        max_tokens: 2048,
      });

      const basePromptOutput = baseCompletion.data.choices.pop();

      res.status(200).json({output: basePromptOutput});
};

export default generateAction;
