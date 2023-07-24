const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");
const QuizEntry = require("../../models/QuizEntry");
const levels = require("../../code/levels");
const { EDIT_QUIZ } = require("../../code/commandNames");
const addEntryDetails = require("../../code/addEntryDetails");

const topics = require("../../code/topics");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`${EDIT_QUIZ}`)
    .setDescription(
      "Want to help others test their knowledge? Add a question to SmortQuiz!"
    )
    .addSubcommand((command) => {
      return command
        .setName(EDIT_QUIZ.sub.EDIT)
        .setDescription("Edit a question that has already been entered")
        .addStringOption((option) => {
          return option
            .setName("question")
            .setDescription("The question for this quiz entry")
            .setRequired(true)
            .setMaxLength(300)
            .setAutocomplete(true);
        })
        .addStringOption((option) => {
          return option
            .setName("topic")
            .setDescription("Select topic")
            .setRequired(false)
            .addChoices(...topics);
        });
    })
    .addSubcommand((command) => {
      return command
        .setName(EDIT_QUIZ.sub.ADD)
        .setDescription("Create a new quiz entry")
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
        })
        .addStringOption((option) => {
          return option
            .setName("question")
            .setDescription("Question or prompt")
            .setMinLength(5)
            .setMaxLength(300)
            .setRequired(true);
        })
        .addStringOption((option) => {
          return option
            .setName("answer")
            .setDescription(
              "Answer or response to prompt. Please keep this under 30 characters."
            )
            .setMaxLength(30)
            .setRequired(true);
        })
        .addStringOption((option) => {
          return option
            .setName("source")
            .setDescription(
              "A URL to a reliable source that verifies and explains the question and answer."
            )
            .setMaxLength(300)
            .setRequired(true);
        });
    }),

  async execute(interaction, client) {
    // let newMessage = "";
    // let ephemeral = false;
    let replyObj = { content: "", ephemeral: false};

    try {
      let entry;
      let command = interaction.options.getSubcommand();
      let user = interaction.user.tag;
      if (command === EDIT_QUIZ.sub.EDIT) {
        let id = interaction.options.getString("question");
        entry = await QuizEntry.findOne({
          _id: id,
        });
        if (!entry) {
          replyObj.content += `We could not find a record with the _id "${id}". Please check and try again.\n`;
          ephemeral = true;
          return;
        }

        const modal = new ModalBuilder()
          .setCustomId("editQuizEntry")
          .setTitle("Edit this quiz question");

        const _id = new TextInputBuilder()
          .setCustomId("id")
          .setLabel("id")
          .setStyle(TextInputStyle.Short)
          .setValue(entry._id.toString());
        const _idRow = new ActionRowBuilder().addComponents(_id);

        const question = new TextInputBuilder()
          .setCustomId("question")
          .setLabel("Question/Prompt")
          .setStyle(TextInputStyle.Short)
          .setValue(entry.question);
        const questionRow = new ActionRowBuilder().addComponents(question);

        let answerRows = [];
        entry.answers.forEach((ansText, index) => {
          if (index === 0) {
            const answer = new TextInputBuilder()
              .setCustomId(`answer${index}`)
              .setLabel(`Answer ${index}`)
              .setStyle(TextInputStyle.Short)
              .setValue(ansText)
              .setRequired(false);
            answerRows.push(new ActionRowBuilder().addComponents(answer));
          } else {
            const answer = new TextInputBuilder()
              .setCustomId(`answer${index}`)
              .setLabel(`Answer ${index}`)
              .setStyle(TextInputStyle.Short)
              .setValue(ansText);
            answerRows.push(new ActionRowBuilder().addComponents(answer));
          }
          if (index === entry.answers.length - 1) {
            const newAnswer = new TextInputBuilder()
              .setCustomId("newanswer")
              .setLabel("New Answer")
              .setStyle(TextInputStyle.Short)
              .setRequired(false);
            answerRows.push(new ActionRowBuilder().addComponents(newAnswer));
          }
        });

        let sourceRows = [];
        entry.sources.forEach((srcText, index) => {
          const source = new TextInputBuilder()
            .setCustomId(`source${index}`)
            .setLabel(`Source ${index}`)
            .setStyle(TextInputStyle.Short)
            .setValue(srcText)
            .setRequired(false);
          sourceRows.push(new ActionRowBuilder().addComponents(source));
          if (index === entry.answers.length - 1) {
            const newSource = new TextInputBuilder()
              .setCustomId("newsource")
              .setLabel("New Source")
              .setStyle(TextInputStyle.Short)
              .setRequired(false);
            sourceRows.push(new ActionRowBuilder().addComponents(newSource));
          }
        });

        modal.addComponents(
          // levelRow,
          _idRow,
          questionRow,
          ...answerRows,
          ...sourceRows
        );

        await interaction.showModal(modal);
      }

      if (command === EDIT_QUIZ.sub.ADD) {
        entry = new QuizEntry({
          topic: interaction.options.getString("topic"),
          level: interaction.options.get("level").value,
          question: interaction.options.getString("question"),
          answers: [interaction.options.getString("answer")],
          contributors: [user],
          sources: [interaction.options.getString("source")],
        });
        replyObj.content += `Quiz question received!\n\n`;
        await entry.save();
      }

      // will change soon
      // newMessage = 
      addEntryDetails(entry, replyObj);
    } catch (e) {
      if (replyObj.content.length > 0) replyObj.content += "\n";
      replyObj.content += `I'm having trouble with something. I got this error:\n   ${
        e.name || "Error"
      }: ${e.message}`;
      ephemeral = true;
      console.error(e);
    } finally {
      if (replyObj.content.length === 0) replyObj.content += "No questions available";
      await interaction.reply(replyObj);
    }
  },

  async autocomplete(interaction, client) {
    const focusedValue = interaction.options.getFocused();
    const regex = new RegExp(focusedValue, "i");
    // const choices = await QuizEntry.find({ question: { $regex: regex } });
    const choices = [{name: "blah", value: 0},{name: "lorem", value: 1},{name: "ipsum", value: 2}]

    await interaction.respond(
      choices.map((choice) => ({ name: choice.question, value: choice._id }))
    );
  },
};

// Hi, Joe :)