require("dotenv").config({ path: "./.env" });
const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [
  new SlashCommandBuilder()
    .setName("help")
    .setDescription(`Replies with how to interact with bot`),
];

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
    { body: commands }
  )
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
