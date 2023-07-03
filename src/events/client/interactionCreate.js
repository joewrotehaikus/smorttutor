const { Events } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,

  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;
      try {
        await command.execute(interaction, client);
      } catch (e) {
        console.error(e);
        await interaction.reply({
          content: `Error in Chat Input Command ${commandName}:\n> ${
            e.name || "Error"
          }\n> ${e.message}`,
          ephemeral: true,
        });
      }
    }

    if (interaction.isModalSubmit()) {
      const { customId } = interaction;
      const { modals } = client;
      const modal = modals.get(customId);
      if (modal) modal.execute(interaction, client);
      else
        interaction.reply({
          content: `The modal response for ${customId} could not be found`,
        });
    }

    if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);

      try {
        if (!button) throw Error("Button not found");
        await button.execute(interaction, client);
      } catch (e) {
        console.error(e);
      }
    }

    if (interaction.isStringSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const menu = selectMenus.get(customId);
      console.log(customId, "Menu");
      try {
        if (!menu) throw Error("Menu not found");
        await menu.execute(interaction, client);
      } catch (e) {
        console.error(e);
      }
    }

    if (interaction.isAutocomplete()) {
      const command = interaction.client.commands.get(interaction.commandName);
      command.autocomplete(interaction, client);
    }
  },
};
