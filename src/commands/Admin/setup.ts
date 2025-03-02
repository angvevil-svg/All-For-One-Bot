import { ApplicationCommandOptionType, ApplicationCommandType, ChannelType, CommandInteraction, CommandInteractionOptionResolver, EmbedBuilder, GuildMember, Message, PermissionFlagsBits, PermissionsBitField } from "discord.js";
import { EphemeralOption } from "../../storage/contants";
import { CommandType } from "../../types/interfaces";
import HexToNumber from "../../functions/HexToNumber";
import EmbedData from "../../storage/embed";
import getAuthor from "../../utils/getAuthor";
import error from "../../utils/error";

const command: CommandType = {
  data: {
    name: "setup",
    description: "تنظیمات ربات در سرور.",
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
        name: "bot-channels",
        description: "چنلی که بات فقط در آنجا کار کند.",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
          {
            name: "white-list",
            description: "چنلی که کامند های بات باید کار کند.",
            type: ApplicationCommandOptionType.Channel,
            channel_types: [ChannelType.GuildText]
          },
          {
            name: "black-list",
            description: "چنلی که کامند های بات نباید کار کند.",
            type: ApplicationCommandOptionType.Channel,
            channel_types: [ChannelType.GuildText]
          },
          EphemeralOption
        ]
      }
    ]
  },
  category: "admin",
  aliases: ["set", "st"],
  cooldown: 10,
  only_slash: true,
  only_message: true,

  run: async (client, interaction, args) => {
    try {
      const
        user = getAuthor(interaction)!,
        db = client.db!,
        Subcommand = interaction instanceof CommandInteraction && interaction.options instanceof CommandInteractionOptionResolver ? interaction.options.getSubcommand() : args![0];

      switch (Subcommand) {
        case "bot-channels": {
          const
            whiteListChannel = interaction instanceof CommandInteraction && interaction.options instanceof CommandInteractionOptionResolver ? interaction.options.getChannel("white-list") : args![1],
            blackListChannel = interaction instanceof CommandInteraction && interaction.options instanceof CommandInteractionOptionResolver ? interaction.options.getChannel("black-list") : args![2],
            embed = new EmbedBuilder()
              .setAuthor({ name: "Admin Panel | bot-channels" })
              .setColor(HexToNumber(EmbedData.color.theme));

          if (!whiteListChannel && !blackListChannel) {
            return;
          }

          if (whiteListChannel) { }
          break;
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