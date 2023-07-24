const { SlashCommandBuilder } = require("discord.js");
const { SHOW_QUESTIONS } = require("../../code/commandNames");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(SHOW_QUESTIONS)
    .setDescription("This will give you the list of all pending questions"),

  async execute(interaction, client) {
    let replyObj = { content: "", ephemeral: true };
    try {
      client.questions.forEach((q, index) => {
        if (index > 0) replyObj.content += "\n";
        replyObj.content += `${index + 1}. ${q.options.getString("question")} ${
          q.channel
        }`;
      });
    } catch (e) {
      if (replyObj.content.length > 0) replyObj.content += "\n";
      replyObj.content += `I'm having trouble with something. I got this error:\n   ${
        e.name || "Error"
      }: ${e.message}`;
    } finally {
      if (replyObj.content.length === 0)
        replyObj.content += "No questions available";
      await interaction.reply(replyObj);
    }
  },
};
