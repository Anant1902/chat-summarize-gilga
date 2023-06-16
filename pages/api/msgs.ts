import { NextApiRequest, NextApiResponse } from "next";
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function msgs(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {

        let msgs:Object[] = req.body.msgs;


        const aiResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: msgs
        });

        const responseText = aiResponse.data.choices[0].message.content;
        res.status(200).json({ responseText })
    } catch (e) {
        console.error(e);
    }
}