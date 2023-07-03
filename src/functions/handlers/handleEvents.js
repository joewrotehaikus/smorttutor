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

    // const eventFolders = await fs.readdir("./src/events");
    // for (const folder of eventFolders) {
    //   const eventFiles = fs
    //     .readdirSync(`./src/events/${folder}`)
    //     .filter((file) => file.endsWith(".js"));

    //   switch (folder) {
    //     case "client":
    //       for (const file of eventFiles) {
    //         const event = require(`../../events/${folder}/${file}`);
    //         if (event.once) {
    //           client.once(event.name, (...args) =>
    //             event.execute(...args, client)
    //           );
    //         } else {
    //           client.on(event.name, (...args) =>
    //             event.execute(...args, client)
    //           );
    //         }
    //         console.log(`Event for ${file} is handled`);
    //       }
    //       break;

    //     default:
    //       break;
    //   }
    // }
  };
};
