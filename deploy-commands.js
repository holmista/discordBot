require("dotenv").config();
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const coins = ["bitcoin", "ethereum", "cardano"];

const commands = coins.map((coin) =>
  new SlashCommandBuilder()
    .setName(coin)
    .setDescription(`Replies with ${coin} price!`)
);

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
