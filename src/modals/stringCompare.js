const stringCompare = require("../code/stringCompare");

module.exports = {
  name: "stringCompare",

  async execute(interaction, client) {
    let newMessage = "";
    try {
      let string1 = interaction.fields.getTextInputValue("string1");
      let string2 = interaction.fields.getTextInputValue("string2");
      let similarity = stringCompare(string1, string2);
      newMessage += `The two strings are ${(similarity * 100).toFixed(
        2
      )}% similar.\n\n> ${string1}\n> ${string2}`;
    } catch (e) {
      if (newMessage.length > 0) newMessage += "\n";
      newMessage += `I'm having trouble with something. I got this error:\n   ${
        e.name || "Error"
      }: ${e.message}`;
    } finally {
      await interaction.reply({ content: newMessage });
    }
  },
};
