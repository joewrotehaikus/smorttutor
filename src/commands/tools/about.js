const { SlashCommandBuilder } = require("discord.js");
const { ABOUT } = require("../../code/commandNames");

module.exports = {
  data: new SlashCommandBuilder()
    .setName(ABOUT)
    .setDescription("Curious about my story? Well, I'll tell you."),

  async execute(interaction, client) {
    let newMessage = "";
    try {
      let user =
        interaction.member.user.nickname || interaction.member.user.tag;
      newMessage += `Thank you for asking, ${user}!\nSo, one day, the moderators of Coder Life were discussing a way to help beginning coders who naturally have a lot of questions. It's important to ask questions in order to learn, but they wanted people to get help even when a qualified user was not available. So, it seemed like a good time to work in OpenAI's chat API. But AI in general has flaws and limitations.\n\nOne of the moderators, Qrow, suggested we enable the bot to receive corrections from humans, in order to make it "smort," which was his cutesie misspelling of "smart." The misspelling amused the moderators, as a quick Google search provided a variety of meanings, which were anything but "smart," including that it is the Swedish word for "smeared." This seemed appropriate, as AI, as much as it has progressed, will always fall just short of giving appropriate information.\n\nThus, SmortTutor is intended to be a healthy mix of AI and human assistance. Still in development. The AI API has not been added.`;
    } catch (e) {
      newMessage += `I'm having trouble with something. I got this error:\n   ${
        e.name || "Error"
      }: ${e.message}`;
    } finally {
      await interaction.reply({ content: newMessage, ephemeral: true });
    }
  },
};
