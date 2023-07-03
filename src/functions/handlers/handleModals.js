const fs = require("fs");

module.exports = (client) => {
  client.handleModals = async () => {
    const modalFiles = fs.readdirSync("./src/modals");
    const { modals } = client;
    for (const file of modalFiles) {
      const response = require(`../../modals/${file}`);
      modals.set(response.name, response);
      console.log(
        `Modal response: ${response.name} has been passed through the handler`
      );
    }
  };
};
