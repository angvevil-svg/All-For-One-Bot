import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, CommandInteraction, CommandInteractionOptionResolver, EmbedBuilder, GuildMember, Message, PermissionFlagsBits, PermissionsBitField } from "discord.js";
import { EphemeralOption, ReasonOption } from "../../storage/contants";
import { CommandType } from "../../types/interfaces";
import HexToNumber from "../../functions/HexToNumber";
import EmbedData from "../../storage/embed";
import getAuthor from "../../utils/getAuthor";
import error from "../../utils/error";

const command: CommandType = {
  data: {
    name: "member",
    description: "مدیریت ممبر ها در سرور.",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: new PermissionsBitField([
      PermissionFlagsBits.SendMessages,
    ]),
    default_bot_permissions: new PermissionsBitField([
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.EmbedLinks
    ]),
    options: [
      {
        name: "ban",
        description: "بن ممبر از سرور.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "user",
            description: "کاربر را وارد کنید.",
            type: ApplicationCommandOptionType.String,
            required: true
          },
          {
            name: "undo",
            description: "آن بن یوزر در سرور.",
            type: ApplicationCommandOptionType.Boolean,
            required: false
          },
          ReasonOption,
          {
            name: "delete_messages",
            type: ApplicationCommandOptionType.String,
            description: "پیغام های ممبر از چه موقع به بعد پاک شود؟",
            choices: [
              {
                name: "Don't Delete Any",
                value: "0"
              },
              {
                name: "Previous Hour",
                value: "1h"
              },
              {
                name: "Previous 6 Hours",
                value: "6h"
              },
              {
                name: "Previous 12 Hours",
                value: "12h"
              },
              {
                name: "Previous 24 Hours",
                value: "24h"
              },
              {
                name: "Previous 3 Days",
                value: "3d"
              },
              {
                name: "Previous 7 Days",
                value: "7d"
              }
            ],
            required: false
          },
          {
            name: "time",
            description: "زمان بن بودن کاربر را وارد کنید.",
            type: ApplicationCommandOptionType.String,
            required: false
          },
          EphemeralOption
        ]
      },
      {
        name: "kick",
        description: "اخراج ممبر از سرور.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: ""
          },
          ReasonOption,
          EphemeralOption
        ]
      }
    ]
  },
  category: "admin",
  aliases: ["mem"],
  cooldown: 10,
  only_slash: true,
  only_message: true,

  run: async (client, interaction, args) => {
    try {
      const
        db = client.db!,
        Subcommand = interaction instanceof CommandInteraction && interaction.options instanceof CommandInteractionOptionResolver ? interaction.options.getSubcommand() : args![0];

      switch (Subcommand) {
        case "ban": {
          interaction.guild?.members.kick([], { deleteMessageSeconds, reason })
        }

        default: {
          break;
        }
      }

    } catch (e: any) {
      error(e)
    }
  }
};
export default command;
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */