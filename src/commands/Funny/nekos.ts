import { ApplicationCommandType,CommandInteraction, CommandInteractionOptionResolver, PermissionFlagsBits, PermissionsBitField } from "discord.js";
import { CommandType } from "../../types/interfaces";
import getAuthor from "../../utils/getAuthor";
import error from "../../utils/error";

const command: CommandType = {
  data: {
    name: "nekos",
    description: "دستورات سرگرم کننده نکوس.",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: new PermissionsBitField([
      PermissionFlagsBits.SendMessages,
    ]),
    default_bot_permissions: new PermissionsBitField([
      PermissionFlagsBits.SendMessages,
      PermissionFlagsBits.EmbedLinks
    ]),
    dm_permission: true
  },
  category: "member",
  aliases: ["h", "commands"],
  cooldown: 10,
  only_slash: true,
  only_message: true,

  run: async (client, interaction, args) => {
    try {
      const
        user = getAuthor(interaction)!,
        Subcommand = interaction instanceof CommandInteraction && interaction.options instanceof CommandInteractionOptionResolver ? interaction.options.getSubcommand() : args![0];

      switch (Subcommand) {
        
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