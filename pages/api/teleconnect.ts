

    // const response = await axios.get('https://api.telegram.org/bot6090131740:AAFlD85pVuNXvlmwPuU6Q2ObAGuxEwcQtoY/getUpdates')
    // console.log(response);

    const TelegramBot = require('node-telegram-bot-api');

    const token = '6090131740:AAFlD85pVuNXvlmwPuU6Q2ObAGuxEwcQtoY';
    const bot = new TelegramBot(token, {polling: true});

    bot.on('message', (msg) => {

        bot.sendMessage("Hello");
    });