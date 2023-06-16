import { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
    ) {
        if (req.method !== 'POST') {
            res.status(405).json({ message: 'Method Not Allowed' });
            return;
          } 

        try { 
            const { para } = req.body;

            const aiResponse = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: 'user',
                        content: 'Can you summarize this paragraph for me?'
                    },
                    {
                        role: 'assistant',
                        content: 'Sure. Please send the text that you want to summarize!'
                    },
                    {
                        role: 'user',
                        content: para
                    },
                ]
            });
            const responseText = aiResponse.data.choices[0].message.content;
            res.status(200).json({ responseText });
        }
        catch (e) {
            console.error('Request error', e);
        }
  }
