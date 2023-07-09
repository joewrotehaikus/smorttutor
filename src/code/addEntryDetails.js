const { EDIT_QUIZ } = require("./commandNames");

function addEntryDetails(
  entry,
  message,
  options = { question: true, answers: true, sources: true, slug: true }
) {
  let newMessage = message;
  if (options.question || options.question == undefined) {
    newMessage += `\n\nQuestion:\n> ${entry.question}\n`;
  }

  if (options.answers || options.answers == undefined) {
    entry.answers.forEach((ans, index) => {
      if (entry.answers.length === 1) {
        newMessage += `\nAnswer\n`;
      } else {
        newMessage += `\nAnswer ${index}\n`;
      }
      newMessage += `> ${ans}`;
    });
  }

  if (options.sources || options.sources == undefined) {
    entry.sources.forEach((src, index) => {
      if (entry.sources.length === 1) {
        newMessage += `\n\nSource`;
      } else {
        newMessage += `\nSource ${index}`;
      }
      newMessage += `\n> ${src}`;
    });
  }

  if (options.slug || options.slug == undefined) {
    newMessage += `\n\nTo edit this question, add other acceptable answers, and/or add more reliable sources, use \`/${EDIT_QUIZ.EDIT}\` and enter \`${entry.slug}\` into the ID option.`;
  }

  return newMessage;
}

module.exports = addEntryDetails;