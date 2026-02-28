const { QuickDB } = require("quick.db");
const clc = require("cli-color");

let db;

/**
 * Database Handler
 * Supports: mongodb, mysql, json, sqlite
 * @param {import("discord.js").Client} client
 */
module.exports = async (client) => {

  try {

    const config = require("../../config");
    const database = config.source.database;

    let driver;

    switch (database.type.toLowerCase()) {

      case "mongodb": {
        const { MongoDriver } = require("quickmongo");

        driver = new MongoDriver(database.mongoURL);

        await driver.connect();

        console.log(
          clc.greenBright("✅ MongoDB connected successfully")
        );
      }
      break;

      case "mysql": {
        const { MySQLDriver } = require("quick.db");

        driver = new MySQLDriver(database.mysql);

        console.log(
          clc.greenBright("✅ MySQL connected successfully")
        );
      }
      break;

      case "json": {
        const { JSONDriver } = require("quick.db");

        driver = new JSONDriver();

        console.log(
          clc.greenBright("✅ JSON database connected successfully")
        );
      }
      break;

      case "sqlite":
      default: {
        const { SQLiteDriver } = require("quick.db");

        driver = new SQLiteDriver();

        console.log(
          clc.yellowBright("⚠ Using SQLite database")
        );
      }
      break;

    }

    db = new QuickDB({ driver });

    await db.init();

    client.db = db;

    console.log(
      clc.greenBright(
        `✅ Database initialized (Type: ${database.type.toUpperCase()})`
      )
    );

  } catch (err) {

    console.log(
      clc.redBright("❌ Database connection failed:")
    );

    console.error(err);

  }

};
