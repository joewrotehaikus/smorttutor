const addEntryDetails = require("../code/addEntryDetails.js");
const stringCompare = require("../code/stringCompare.js");

module.exports = {
  name: "quizQuestion",

  async execute(interaction, client) {
    // let newMessage = "";
    let replyObj = { content: "", ephemeral: false};
    try {
      let quiz = client.quiz[interaction.user.id];
      let answer = interaction.fields.getTextInputValue("question");
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

      // Will change soon
      // newMessage = 
      addEntryDetails(quiz, newMessage, { slug: false });
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
