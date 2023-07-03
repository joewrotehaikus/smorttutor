require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
const { CLIENT_ID, GUILD_ID, BOT_TOKEN } = process.env;

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    const { commands } = client;
    const commandArray = []
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of commandFiles) {
        const command = require(`../../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandArray.push(command.data.toJSON());
        console.log(
          `Command: ${command.data.name} has been passed through the handler`
        );
      }
    }

    try {
      const rest = new REST({ version: "9" }).setToken(BOT_TOKEN);
      console.log("Started refreshing application slash commands.");

      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: commandArray,
      });
      console.log("Successfully reloaded application slash commands");
    } catch (e) {
      console.error(e);
    }
  };
};
