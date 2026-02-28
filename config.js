const { ActivityType } = require("discord.js");
require("dotenv").config();

module.exports = {

  // Bot Token (ONLY from .env for safety)
  token: process.env.token,

  // Prefix
  prefix: process.env.prefix || "!",

  // Main Server ID
  serverId: process.env.server_id || "1474620032745996360",

  // Slash command mode
  only_one_guild: false,

  // Database settings
  source: {
    database: {

      // mongodb | mysql | json
      type: "mongodb",

      // Your MongoDB Atlas URL
      mongoURL: process.env.database_mongoURL,

      mysql: {
        host: "",
        user: "",
        password: "",
        database: ""
      }

    }
  },

  // Bot status
  status: {

    activity: [
      "Elemental SMP Bot 🤖",
      "Serving {servers} servers 🌍",
      "Helping {members} users 👥"
    ],

    type: [
      ActivityType.Playing
    ],

    presence: [
      "online"
    ]

  },

  // Webhook
  webhook: {

    url: process.env.webhook_url || "",

    username: "Elemental Bot",

    avatar:
      "https://cdn.discordapp.com/embed/avatars/0.png"

  },

  // Owners
  owners: [
    "865630940361785345"
  ],

  // Chat bot
  chat_bot: {

    name: "Elemental",

    gender: "Male"

  }

};
