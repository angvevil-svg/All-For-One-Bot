const { ActivityType } = require("discord.js");
require("dotenv").config();

module.exports = {

  // Bot Token (from .env)
  token: process.env.token || "MTQ3NDY0NDM1MTQyNTcxMjI1OQ.GMHSxS.dudmjit1_ZoovZOEEfFdSdysIifwC2CdPDhQOY",

  // Prefix
  prefix: process.env.prefix || "!",

  // Main Server ID
  serverId: process.env.server_id || "1474620032745996360",

  // Slash command mode
  only_one_guild: false,

  // Database settings
  source: {
    database: {

      // Database type: mongodb | sql | mysql | json
      type: process.env.database_type || "mongodb",

      // MongoDB connection URL
      mongoURL: process.env.database_mongoURL || "",

      // MySQL settings (ignore if using mongodb)
      mysql: {
        host: process.env.database_msql_host || "",
        user: process.env.database_msql_user || "",
        password: process.env.database_msql_password || "",
        database: process.env.database_msql_database || ""
      }

    }
  },

  // Bot status settings
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

  // Webhook settings
  webhook: {

    url: process.env.webhook_url || "",

    username: process.env.webhook_username || "Elemental Bot",

    avatar: process.env.webhook_avatar ||
      "https://cdn.discordapp.com/embed/avatars/0.png"

  },

  // Bot owners
  owners: [
    "865630940361785345"
  ],

  // Chat bot settings
  chat_bot: {

    name: "Elemental",

    gender: "Male"

  }

};
