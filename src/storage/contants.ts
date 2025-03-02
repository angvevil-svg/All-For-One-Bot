import { ApplicationCommandOptionType } from "discord.js";

const EphemeralOption = {
  name: "ephemeral",
  description: "آیا می‌خواهید این پیام مخفی بماند؟",
  type: ApplicationCommandOptionType.String,
  choices: [
    {
      name: "بله",
      value: "true"
    },
    {
      name: "خیر",
      value: "false"
    }
  ],
  required: false
};

const ReasonOption = {
  name: "reason",
  description: "دلیل را ذکر کنید.",
  type: ApplicationCommandOptionType.String,
  required: false
};

export {
  EphemeralOption,
  ReasonOption
};
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */
