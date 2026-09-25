const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error("ERROR: BOT_TOKEN not set!");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

console.log("Bot Started! Waiting for messages...");

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "👋 Hello! Your bot is LIVE and working! Send me any message.");
});

bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    bot.sendMessage(msg.chat.id, `You said: ${msg.text}`);
  }
});
