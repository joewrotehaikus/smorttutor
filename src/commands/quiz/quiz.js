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
    let replyObj = {content: "", ephemeral: false};
    // let ephemeral = false;
    let prompt;

    try {
      let topic = interaction.options.getString("topic");
      let level = interaction.options.get("level").value;
      const question = await QuizEntry.aggregate([
        { $match: { topic, level } },
        { $sample: { size: 1 } },
      ]).exec();
      let user = interaction.user.id;
      if (!client.quiz) client.quiz = {};
      if (question[0] != undefined) {
        client.quiz[user] = question[0];
        prompt = question[0].question;
      } else {
        replyObj.content += `No questions for topic "${topic}" at level "${level}" are available`;
      }
    } catch (e) {
      if (replyObj.content.length > 0) replyObj.content += "\n";
      replyObj.content += `I'm having trouble with something. I got this error:\n   ${
        e.name || "Error"
      }: ${e.message}`;
      replyObj.ephemeral = true;
    } finally {
      if (prompt == undefined) {
        await interaction.reply(replyObj);
      } else {
        interaction.showModal({
          custom_id: "quizQuestion",
          title: `${interaction.user.tag}, your question is:`,
          components: [
            {
              type: 1,
              components: [
                {
                  type: 4,
                  custom_id: "prompt",
                  label: "Question",
                  style: 2,
                  value: prompt,
                },
              ],
            },
            {
              type: 1,
              components: [
                {
                  type: 4,
                  custom_id: "question",
                  label: "Your answer",
                  style: 1,
                },
              ],
            },
          ],
        });
      }
    }
  },
};
