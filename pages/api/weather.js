import { Configuration, OpenAIApi } from "openai";
import airports from "airport-codes";

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
    const weatherCode = req.body.weatherCode;
    const time = weatherCode.split(" ")[2].slice(2);
    const dateUTC = new Date().toISOString();
    const date = dateUTC.slice(0, 11);
    const timeOfPublish = `${date}${time.slice(0, 2)}:${time.slice(2, 4)}:00Z`;
    const fullTime = new Date(timeOfPublish);
    const localTimeOfPublish = fullTime.toLocaleTimeString('en-US');
    const iata = weatherCode.split(" ")[1].slice(1);
    const airportName = airports.findWhere({ iata: iata }).get('name');
    res.status(200).json({ airport: airportName, timeOfPublish: localTimeOfPublish, result: completion.data.choices[0].text });
  }
  
  function generatePrompt(weatherCode) {
    return `Give me a description for this weather.
    Weather: ${weatherCode}
    Description:`;
  }
  
