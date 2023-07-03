const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
  StringSelectMenuOptionBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("menu")
    .setDescription("this is a menu"),

  async execute(interaction, client) {
    const menu = new StringSelectMenuBuilder()
      .setCustomId("menu")
      .setMinValues(1)
      .setMaxValues(1)
      .setOptions(
        new StringSelectMenuOptionBuilder(
          {
            label: "Option 1",
            value: "https://joedev.xyz",
          },
          new StringSelectMenuOptionBuilder({
            label: "second option",
            value: "https://www.facebook.com",
          })
        )
      );

    await interaction.reply({
      components: [new ActionRowBuilder().addComponents(menu)],
    });
  },
};
