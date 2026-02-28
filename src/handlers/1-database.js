const { QuickDB, MongoDriver } = require("quick.db");
const clc = require("cli-color");
const error = require("../functions/error");
const post = require("../functions/post");

const database = require("../../config").source.database;

/**
 * @param {import("discord.js").Client} client
 */
module.exports = async (client) => {

  try {

    let driver;

    switch (database.type) {

      case "mongodb": {

        driver = new MongoDriver(database.mongoURL);

        await driver.connect();

        break;

      }

      case "sql": {

        const { SQLiteDriver } = require("quick.db");

        driver = new SQLiteDriver();

        break;

      }

      case "json": {

        const { JSONDriver } = require("quick.db");

        driver = new JSONDriver();

        break;

      }

      case "mysql": {

        const { MySQLDriver } = require("quick.db");

        driver = new MySQLDriver(database.mysql);

        break;

      }

      default:

        throw new Error("Invalid database type");

    }

    const db = new QuickDB({ driver });

    await db.init();

    client.db = db;

    post(
      `Database Is Successfully Connected!! (Type: ${database.type.toUpperCase()})`,
      "S"
    );

  } catch (e) {

    post(
      clc.red(
        `Database Doesn't Connected!! (Type: ${database.type.toUpperCase()})`
      ),
      "E"
    );

    error(e);

  }

};
