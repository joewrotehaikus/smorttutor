const { EDIT_QUIZ } = require("./commandNames");

function addEntryDetails(
  entry,
  message,
  options = { question: true, answers: true, sources: true, slug: true }
) {
  let newMessage = "";
  newMessage += `${message}`;
  if (options.question) {
    newMessage += `\n\nQuestion:\n> ${entry.question}\n`;
  }

  if (options.answers) {
    entry.answers.forEach((ans, index) => {
      if (entry.answers.length === 1) {
        newMessage += `\nAnswer\n`;
      } else {
        newMessage += `\nAnswer ${index}\n`;
      }
      newMessage += `> ${ans}`;
    });
  }

  if (options.sources) {
    entry.sources.forEach((src, index) => {
      if (entry.sources.length === 1) {
        newMessage += `\nSource`;
      } else {
        newMessage += `\nSource ${index}`;
      }
      newMessage += `\n> ${src}`;
    });
  }

  if (options.slug) {
    newMessage += `\n\nTo edit this question, add other acceptable answers, and/or add more reliable sources, use \`/${EDIT_QUIZ.EDIT}\` and enter \`${entry.slug}\` into the ID option.`;
  }
  console.log("This is from addEntryDetails: " + newMessage)

  return newMessage;
}

module.exports = addEntryDetails;