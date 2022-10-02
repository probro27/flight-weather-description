import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


export default async function (req, res) {
    const completion = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: generatePrompt(req.body.weatherCode),
      temperature: 0.5,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 2,
      presence_penalty: 0,
      best_of: 1
    });
    console.log(completion.data);
    res.status(200).json({ result: completion.data.choices[0].text });
  }
  
  function generatePrompt(weatherCode) {
    return `Give me a description for this weather.
    Weather: ${weatherCode}
    Description:`;
  }
  
