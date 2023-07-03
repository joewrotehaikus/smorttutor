const { SlashCommandBuilder } = require("discord.js");
const { TAKE_QUIZ, ANSWER_QUIZ } = require("../../code/commandNames");
const QuizEntry = require("../../models/QuizEntry");
const levels = require("../../code/levels");
const topics = require("../../code/topics");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(TAKE_QUIZ)
    .setDescription(
      "Pick a topic, and I will ask you a question to test your knowledge."
    )
    .addStringOption((option) => {
      return option
        .setName("topic")
        .setDescription("Pick a topic")
        .setRequired(true)
        .addChoices(...topics);
    })
    .addIntegerOption((option) => {
      return option
        .setName("level")
        .setDescription("How confident are you in your abilities?")
        .setRequired(true)
        .addChoices(...levels);
    }),

  async execute(interaction, client) {
    let newMessage = "";
    let ephemeral = false;

    try {
      let topic = interaction.options.getString("topic");
      let level = interaction.options.get("level").value;
      const question = await QuizEntry.aggregate([
        { $match: { topic, level } },
        { $sample: { size: 1 } },
      ]).exec();
      console.log(question[0]);
      let user = interaction.user.id;
      if (!client.quiz) client.quiz = {};
      if (question[0] != undefined) {
        client.quiz[user] = question[0];
        newMessage += `<@${user}>, your question is:\n> ${question[0].question}\n\nTo answer, use \`/${ANSWER_QUIZ}\``;
      } else {
        newMessage += "No questions for that topic and level are available";
      }
    } catch (e) {
      if (newMessage.length > 0) newMessage += "\n";
      newMessage += `I'm having trouble with something. I got this error:\n   ${
        e.name || "Error"
      }: ${e.message}`;
      ephemeral = true;
    } finally {
      if (newMessage.length === 0) newMessage += "No questions available";
      await interaction.reply({ content: newMessage, ephemeral });
    }
  },
};