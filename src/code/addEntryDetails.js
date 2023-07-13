const { EDIT_QUIZ } = require("./commandNames");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

function addEntryDetails(
  entry,
  replyObject,
  options = { question: true, answers: true, sources: true, slug: true }
) {
  // let replyObject.content = replyObject;
  if (options.question || options.question == undefined) {
    replyObject.content += `\n\nQuestion:\n> ${entry.question}\n`;
  }

  if (options.answers || options.answers == undefined) {
    entry.answers.forEach((ans, index) => {
      if (entry.answers.length === 1) {
        replyObject.content += `\nAnswer\n`;
      } else {
        replyObject.content += `\nAnswer ${index}\n`;
      }
      replyObject.content += `> ${ans}`;
    });
  }

  if (options.sources || options.sources == undefined) {
    replyObject.components = [];
    let row = new ActionRowBuilder();
    replyObject.components.push(row);
    entry.sources.forEach((src, index) => {
      const btn = new ButtonBuilder()
        .setCustomId(`btn_${index}`)
        .setLabel(src)
        .setURL(src)
        .setStyle(ButtonStyle.Primary);
      if (index < 5) {
        row.addComponents(btn);
      }
      // if (entry.sources.length === 1) {
      //   replyObject.content += `\n\nSource`;
      // } else {
      //   replyObject.content += `\nSource ${index}`;
      // }
      // replyObject.content += `\n> ${src}`;
    });
  }

  if (options.slug || options.slug == undefined) {
    replyObject.content += `\n\nTo edit this question, add other acceptable answers, and/or add more reliable sources, use \`/${EDIT_QUIZ.EDIT}\` and enter \`${entry.slug}\` into the ID option.`;
  }

  return replyObject.content;
}

module.exports = addEntryDetails;
