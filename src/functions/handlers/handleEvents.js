const { readdir } = require("fs");

module.exports = (client) => {
  client.handleEvents = async () => {
    readdir("./src/events", handleFolders);

    function handleFolders(error, eventFolders) {
      if (error) throw error;
      for (const folder of eventFolders) {
        if (folder === "client") {
          readdir(`./src/events/${folder}`, handleClientFiles);
        }
      }
    }

    function handleClientFiles(error, files) {
      if (error) throw error;
      for (const file of files.filter((file) => file.endsWith(".js"))) {
        const { name, once, execute } = require(`../../events/client/${file}`);
        if (once) {
          client.once(name, (...args) => {
            execute(...args, client);
          });
        } else {
          client.on(name, (...args) => {
            execute(...args, client);
          });
        }
        console.log(`Event: ${name} is handled.`);
      }
    }
  };
};
