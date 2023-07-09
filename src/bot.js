require("dotenv").config();
const { set, connect, connection } = require("mongoose");
const { readdirSync } = require("fs");
const { BOT_TOKEN, DB_URL } = process.env;

try {
  set("strictQuery", false);
  connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = connection;

  db.once("open", () => {
    console.log("Connected to database");
  });
} catch (e) {
  console.error("Error with Mongoose", e.message);
}

const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});
client.commands = new Collection();
client.modals = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.questions = [];

const functionFolders = readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = readdirSync(`./src/functions/${folder}`).filter(
    (file) => file.endsWith(".js")
  );

  for (const file of functionFiles) {
    require(`./functions/${folder}/${file}`)(client);
  }
}

try {
  client.handleCommands();
  client.handleEvents();
  client.handleModals();
  client.handleComponents();
  client.login(BOT_TOKEN);
} catch (e) {
  console.error(`ERROR: ${e.name || "General"}`);
  console.error(e.message);
}
