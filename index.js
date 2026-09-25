const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("ERROR: BOT_TOKEN not set!");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });
console.log("Bot Started! Waiting for messages...");

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👋 Hello! Your bot is LIVE and working!");
});

bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    bot.sendMessage(msg.chat.id, `You said: ${msg.text}`);
  }
});

// Keep Render happy
const app = express();
app.get('/', (req, res) => res.send('Bot is running!'));
const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Web server on port ${port}`));
