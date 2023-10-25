import { Configuration, OpenAIApi } from "openai";
import TelegramBot from "node-telegram-bot-api";

export default async function handler(req, res) {
  
  const configuration = new Configuration({
    apiKey: process.env.API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
  async function connectAI(msgs) {
    return openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: msgs
        }).then((aiResponse) => {
            const responseText = aiResponse.data.choices[0].message.content;
            console.log(msgs);
            return responseText;
        }).catch((error) => console.log(error));
    }

    let messages = [
    ]
    const token = process.env.tele_API_token;
    const bot = new TelegramBot(token, {polling: true});
    bot.on('message', async (msg) => {
        let incoming_msg = msg.text.toString()
    
        messages.push({
            role: "user",
            content: incoming_msg
        })
    
        const ans = await connectAI(messages);
        messages.push({
            role: "assistant",
            content: ans
        })
        console.log(ans);
        bot.sendMessage(msg.chat.id, ans);
        });
}