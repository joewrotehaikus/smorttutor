const { SlashCommandBuilder } = require("discord.js");
const stringCompare = require("../../code/stringCompare");
const { ANSWER_QUIZ, TAKE_QUIZ } = require("../../code/commandNames");
const addEntryDetails = require("../../code/addEntryDetails");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(ANSWER_QUIZ)
    .setDescription(
      "Did you use `/smortquiz`? This is where you answer the question it gave you."
    )
    .addStringOption((option) => {
      return option
        .setName("answer")
        .setDescription("Spelling counts")
        .setRequired(true)
        .setMaxLength(30);
    }),

  async execute(interaction, client) {
    // let newMessage = "";
    let replyObj = { content: "", ephemeral: false };

    try {
      let answer = interaction.options.getString("answer");
      let user = interaction.user.id;
      if (!client.quiz) {
        replyObj.content += `Before you can answer a quiz question, you must use \`/${TAKE_QUIZ}\` to receive a question`;
        return;
      }
      let quiz = client.quiz[user];
      // this needs to compare user answer with list of answers
      // until one comparison is > 0.8 (correct)
      // or all are exhausted (incorrect)
      const threshold = 0.8;
      let matchCorrect = quiz.answers.find((correctAnswer) => {
        return (
          stringCompare(correctAnswer.toLowerCase(), answer.toLowerCase()) >
          threshold
        );
      });
      if (matchCorrect) {
        replyObj.content += "Correct!";
      } else {
        replyObj.content += `I'm sorry, but "${answer}" is not correct`;
      }

      // This will soon change
      // newMessage = 
      addEntryDetails(quiz, replyObj);
    } catch (e) {
      if (replyObj.content.length > 0) replyObj.content += "\n";
      replyObj.content += `I'm having trouble with something. I got this error:\n   ${
        e.name || "Error"
      }: ${e.message}`;
      // ephemeral = true;
      replyObj.ephemeral = true;
    } finally {
      if (replyObj.content.length === 0) replyObj.content += "No questions available";
      await interaction.reply(replyObj);
    }
  },
};
