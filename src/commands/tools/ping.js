const { SlashCommandBuilder } = require("discord.js");
const { PING } = require("../../code/commandNames");

module.exports = {
  data: new SlashCommandBuilder().setName(PING).setDescription("just pinging"),

  async execute(interaction, client) {
    let newMessage = "";
    try {
      const message = await interaction.deferReply({
        fetchReply: true,
      });

      newMessage += `API latency: Client ${client.ws.ping}\nClient Ping ${
        message.createdTimestamp - interaction.createdTimestamp
      }`;
    } catch (e) {
      newMessage += `I'm having trouble with something. I got this error:\n   ${
        e.name || "Error"
      }: ${e.message}`;
    } finally {
      await interaction.editReply({ content: newMessage });
    }
  },
};
