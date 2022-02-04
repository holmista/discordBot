require("dotenv").config();
const getPrice = require("./getPrice");
const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.once("ready", () => {
  console.log("Ready!");
});

client.on("messageCreate", async (message) => {
  const { content } = message;
  if (content[0] === "!") {
    const symbol = content.substring(1);
    const price = await getPrice(symbol);
    if (price) await message.reply(price);
    else message.reply("there is no such coin");
  }
});

client.login(process.env.TOKEN);
