import stringCompare from "./stringCompare";

module.exports = {
    name: "quizQuestion",

    async execute(interaction, client) {
        let newMessage = "";
        try {
            let quiz = client.quiz[interaction.user.id];
            let answer = interaction.fields.getTextInputValue("question");
            const threshold = 0.8;
            let matchCorrect = quiz.answers.find((correctAnswer) => {
              return (
                stringCompare(correctAnswer.toLowerCase(), answer.toLowerCase()) >
                threshold
              );
            });
            if (matchCorrect) {
              newMessage += "Correct!";
            } else {
              newMessage += `I'm sorry, but "${answer}" is not correct`;
            }
        } catch (e){
            if (newMessage.length > 0) newMessage += "\n";
            newMessage += `I'm having trouble with something. I got this error:\n   ${
              e.name || "Error"
            }: ${e.message}`;
          } finally {
            await interaction.reply({ content: newMessage });
          }
    }
}