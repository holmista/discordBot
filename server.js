require("dotenv").config();
const getPrice = require("./utils/getPrice");
const { Client, Intents } = require("discord.js");
const pool = require("./connection");

pool
  .connect()
  .then(() => console.log("connected to the database"))
  .catch((e) => {
    console.log(`could not connect to the database \n${e.message}`);
    dclient.destroy();
    process.exit();
  });

const dclient = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

dclient.once("ready", () => {
  console.log("bot ready!");
});

dclient.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;
  const { commandName } = interaction;
  if (commandName === "help") {
    await interaction.reply(
      "use ! and coin symbol to get price of that coin. eg: !btc"
    );
  }
});

dclient.on("messageCreate", async (message) => {
  const { content } = message;
  console.log(content)
  try {
    if (content[0] === "!" && content.length > 3) {
      const symbol = content.substring(1);
      const price = await getPrice(pool, symbol);
      console.log(`message ${price}`)
      if (price) await message.reply(price);
      else await message.reply("there is no such coin");
    }
  } catch (e) {
    console.log(e)
    if (e.message === "database error") await message.reply(e.message);
    else if (e.message === "api error") await message.reply(e.message);
    else await message.reply("an unknown error occured");
  }
});

dclient.login(process.env.TOKEN);
