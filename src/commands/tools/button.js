const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { PING } = require("../../code/commandNames");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("button")
    .setDescription("Return a button"),

  async execute(interaction, client) {
    const button = new ButtonBuilder()
      .setCustomId("button")
      .setLabel("click me")
      .setStyle(ButtonStyle.Primary);

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(button)],
    });
  },
};
