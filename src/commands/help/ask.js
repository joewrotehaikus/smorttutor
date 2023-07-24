const { SlashCommandBuilder } = require("discord.js");
const { ASK_QUESTION, ANSWER_QUESTION } = require("../../code/commandNames");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(ASK_QUESTION)
    .setDescription(
      "Ask me a question. I'll try to get back to you with an answer"
    )
    .addStringOption((option) => {
      return option
        .setName("question")
        .setDescription("This is were you get to the point.")
        .setRequired(true)
        .setMaxLength(200);
    }),

  async execute(interaction, client) {
    let newMessage = "";
    let ephemeral = false;
    try {
      let user = interaction.user;
      let question = interaction.options.getString("question");
      interaction.channel.send(
        `<@${
          user.id
        }> asks:\n> ${question}\n\nIf anyone wants to help me out, use \`/${ANSWER_QUESTION}\` and put it as question_number ${
          client.questions.length + 1
        }`
      );
      newMessage += `Give me a few moments, <@${user.id}>.`;
      client.questions.push(interaction);
    } catch (e) {
      if (newMessage.length > 0) newMessage += "\n";
      newMessage += `I'm having trouble with something. I got this error:\n   ${
        e.name || "Error"
      }: ${e.message}`;
      ephemeral = true;
    } finally {
      await interaction.reply({ content: newMessage, ephemeral });
    }
  },
};
