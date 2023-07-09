const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require("discord.js");
const { STRING_COMPARE } = require("../../code/commandNames");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(STRING_COMPARE)
    .setDescription("See how closely one string matches another"),

  async execute(interaction, client) {
    let newMessage = "";

    try {
      const modal = new ModalBuilder()
        .setCustomId("stringCompare")
        .setTitle("Compare Two Strings to Measure Similarity");

      const string1 = new TextInputBuilder()
        .setCustomId("string1")
        .setLabel("First")
        .setStyle(TextInputStyle.Short);

      const string2 = new TextInputBuilder()
        .setCustomId("string2")
        .setLabel("Second")
        .setStyle(TextInputStyle.Short)
        .setValue("Heyyyyyy!!!!");

      const row1 = new ActionRowBuilder().addComponents(string1);
      const row2 = new ActionRowBuilder().addComponents(string2);
      modal.addComponents(row1, row2);

      await interaction.showModal({
        custom_id: "stringCompare",
        title: "Compare two strings to measure similarity",
        components: [
          {
            type: 1,
            components: [
              {
                type: 4,
                custom_id: "string1",
                label: "First",
                style: 1,
              },
            ],
          },
          {
            type: 1,
            components: [
              {
                type: 4,
                custom_id: "string2",
                label: "Second",
                style: 1,
                value: "heyo",
              },
            ],
          },
          {
            type: 1,
            components: [
              {
                type: 4,
                custom_id: "string3",
                label: "First",
                style: 1,
              },
            ],
          },
          {
            type: 1,
            components: [
              {
                type: 4,
                custom_id: "string4",
                label: "Second",
                style: 2,
                value: "heyo",
              },
            ],
          },
        ],
      });
    } catch (e) {
      if (newMessage.length > 0) newMessage += "\n";
      newMessage += `I'm having trouble with something. I got this error:\n   ${
        e.name || "Error"
      }: ${e.message}`;
      await interaction.reply({ content: newMessage });
    }
  },
};
