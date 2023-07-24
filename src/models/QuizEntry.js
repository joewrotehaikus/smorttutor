const { Schema, models, model } = require("mongoose");
const slugMaker = require("../code/slugMaker");

module.exports =
  models.quizEntry ||
  model(
    "quizEntry",
    new Schema({
      topic: {
        type: String,
        required: true,
      },
      level: {
        type: Number,
        required: true,
        min: [0, "0, for 'Beginner,' is the minimum level"],
        max: [3, "3, for 'Expert,' is the maximum level"],
      },
      question: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        unique: true,
        default: function () {
          return this.topic + "_" + slugMaker(this.question);
        },
      },
      answers: [
        {
          type: String,
          required: true,
        },
      ],
      updated: {
        type: Date,
        default: Date.now,
      },
      sources: [
        {
          type: String,
          required: true,
        },
      ],
      contributors: [String],
    })
  );
