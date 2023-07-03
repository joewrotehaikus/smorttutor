const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("actionrows")
    .setDescription(
      "seeing what I can do with plain objects in a reply/response"
    ),

  async execute(interaction, client) {
    try {
    } catch (e) {
    } finally {
      interaction.reply({
        content: "ID Number goes here",
        components: [
          {
            type: 1,
            components: [
              {
                type: 2,
                label: "This is where the question will go. Click to edit",
                custom_id: "question",
                style: 1,
              },
              {
                type: 2,
                label: "Done Editing",
                custom_id: "done",
                style: 2,
              },
            ],
          },
          {
            type: 1,
            components: [
              {
                type: 3,
                placeholder: "Topic",
                custom_id: "topic",
                options: [
                  {
                    label: "option 1",
                    value: "1",
                  },
                  {
                    label: "option 2",
                    value: "2",
                  },
                ],
              },
            ],
          },
          {
            type: 1,
            components: [
                {
                  type: 3,
                  placeholder: "Level",
                  custom_id: "level",
                  options: [
                    {
                      label: "Beginner",
                      value: "0",
                    },
                    {
                      label: "Intermediate",
                      value: "1",
                    },
                    {
                      label: "Advanced",
                      value: "2",
                    },
                    {
                      label: "Expert",
                      value: "3",
                    },
                  ],
                },
            ]
          },
          {
            type: 1,
            components: [
                {
                    type: 2,
                    label: "This is the first acceptable answer",
                    custom_id: "ans1",
                    style: 1
                },
                {
                    type: 2,
                    label: "This is the second acceptable answer",
                    custom_id: "ans2",
                    style: 1
                },
                {
                    type: 2,
                    label: "This is the third acceptable answer",
                    custom_id: "ans3",
                    style: 1
                },
                {
                    type: 2,
                    label: "This is the fourth acceptable answer",
                    custom_id: "ans4",
                    style: 1
                },
                {
                    type: 2,
                    label: "This is the fifth acceptable answer",
                    custom_id: "ans5",
                    style: 1
                }
            ]
          },
          {
            type: 1,
            components: [
                {
                    type: 2,
                    label: "This is the first acceptable answer",
                    style: 5,
                    url: "https://joedev.xyz"
                },
                {
                    type: 2,
                    label: "This is the second acceptable answer",
                    style: 5,
                    url: "https://joedev.xyz"
                },
                {
                    type: 2,
                    label: "This is the third acceptable answer",
                    style: 5,
                    url: "https://joedev.xyz"
                },
                {
                    type: 2,
                    label: "This is the fourth acceptable answer",
                    style: 5,
                    url: "https://joedev.xyz"
                },
                {
                    type: 2,
                    label: "This is the fifth acceptable answer",
                    style: 5,
                    url: "https://joedev.xyz"
                }
            ]
          }
        ],
      });
    }
  },
};
