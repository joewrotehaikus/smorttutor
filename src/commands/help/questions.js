const { SlashCommandBuilder } = require("discord.js");
const { SHOW_QUESTIONS } = require("../../code/commandNames");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(SHOW_QUESTIONS)
    .setDescription("This will give you the list of all pending questions"),

  async execute(interaction, client) {
    let newMessage = "";
    try {
      client.questions.forEach((q, index) => {
        if (index > 0) newMessage += "\n";
        newMessage += `${index + 1}. ${q.options.getString("question")} ${
          q.channel
        }`;
      });
    } catch (e) {
      if (newMessage.length > 0) newMessage += "\n";
      newMessage += `I'm having trouble with something. I got this error:\n   ${
        e.name || "Error"
      }: ${e.message}`;
    } finally {
      if (newMessage.length === 0) newMessage += "No questions available";
      await interaction.reply({ content: newMessage, ephemeral: true });
    }
  },
};
