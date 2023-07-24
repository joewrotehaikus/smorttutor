const { SlashCommandBuilder } = require("discord.js");
const { ANSWER_QUESTION } = require("../../code/commandNames");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(ANSWER_QUESTION)
    .setDescription("Do you know the answer? Help me out! I'm just a dumb bot!")
    .addIntegerOption((option) => {
      return option
        .setName("question_number")
        .setDescription(
          "Use the number corresponding to the questions given after you used the '/showquestions' command"
        )
        .setRequired(true)
        .setMinValue(1);
    })
    .addStringOption((option) => {
      return option
        .setName("answer")
        .setDescription("What's the answer?")
        .setMaxLength(300)
        .setRequired(true);
    }),

  async execute(interaction, client) {
    let replyObj = { content: "", ephemeral: true };
    try {
      let user = interaction.member.user;
      replyObj.content += `Thank you, ${user.username}! You saved my reputation!`;
      let index = interaction.options.get("question_number").value - 1;
      let question =
        client.questions[
          index < client.questions.length ? index : client.questions.length - 1
        ];
      let response = `Regarding:\n> ${question.options.getString(
        "question"
      )}\n\n${interaction.options.getString("answer")}`;
      question.followUp({
        content: response,
      });
    } catch (e) {
      if (replyObj.content.length > 0) replyObj.content += "\n";
      replyObj.content += `I'm having trouble with something. I got this error:\n   ${
        e.name || "Error"
      }: ${e.message}`;
    } finally {
      await interaction.reply(replyObj);
    }
  },
};
