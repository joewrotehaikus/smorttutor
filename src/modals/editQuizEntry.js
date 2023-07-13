const addEntryDetails = require("../code/addEntryDetails");
const QuizEntry = require("../models/QuizEntry");

module.exports = {
  name: "editQuizEntry",

  async execute(interaction, client) {
    let newMessage = "";
    try {
      let _id = interaction.fields.getTextInputValue("id");
      const entry = await QuizEntry.find({ _id });
      if (!entry) {
        throw Error(`Missing entry id: ${_id}`);
      }
      console.log(entry)
      let question = interaction.fields.getTextInputValue("question");
    } catch (e) {
      console.error(e.name, e.message);
    } finally {
      await interaction.reply({
        content: "Hey, we made it here!!!",
        ephemeral: true,
        suppressEmbeds: true,
      });
    }
  },
};
