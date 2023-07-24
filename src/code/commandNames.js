const commandNames = {
  ANSWER_QUESTION: "answerforsmort",
  ASK_QUESTION: "asksmort",
  SHOW_QUESTIONS: "showquestions",
  ANSWER_QUIZ: "answerquiz",
  EDIT_QUIZ: {
    toString() {
      return "editsmortquiz";
    },
    sub: {
      ADD: 'add',
      EDIT: 'edit'
    },
    get ADD() {
      return `${this} ${this.sub.ADD}`;
    },
    get EDIT() {
      return `${this} ${this.sub.EDIT}`;
    },
  },
  TAKE_QUIZ: "smortquiz",
  ABOUT: "aboutsmort",
  PING: "smortping",
  STRING_COMPARE: "stringcompare",
};

module.exports = commandNames;
