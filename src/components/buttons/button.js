module.exports = {
  data: {
    name: "button",
  },

  async execute(interaction) {
    await interaction.reply({
      content: "https://joedev.xyz",
    });
  },
};
