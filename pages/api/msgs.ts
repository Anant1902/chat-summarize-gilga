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
        let para:string = req.body.para;
        let summ_para:string = req.body.summ_para;
        
        let msgs:Object[] = [
            {
                role: "user",
                content:"Could you summarize the following paragraph for me?"
            },
            {
                role: "assistant",
                content:"Sure! Send the paragraph here."
            },
            {
                role: "user",
                content: para
            },
            {
                role: "assistant",
                content: summ_para
            },
            {
                role: "assistant",
                content: "How can I help?"
            }
        ]

        const newMsg:string = req.body.newMsg;
        const role:string = req.body.role;
        console.log(msgs);
        msgs.push(
            {
                role: role,
                content: newMsg
            }
        )
        
        if(role == "user") {
            const aiResponse = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: msgs
            });

            const responseText = aiResponse.data.choices[0].message.content;
            msgs = msgs.concat(
                {
                    role: "assistant",
                    content: responseText
                }
            );
            console.log(msgs);
            res.status(200).json({ msgs })
        }
    } catch (e) {
        console.error(e);
    }

}