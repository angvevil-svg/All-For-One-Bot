import { ApplicationCommandType, CommandInteraction, CommandInteractionOptionResolver, GuildMember, PermissionsBitField } from "discord.js";
import { MemberCmdOptions } from "../../storage/contants";
import { CommandType } from "../../types/interfaces";
import error from "../../utils/error";

const command: CommandType = {
  data: {
    name: "member",
    description: "مدیریت ممبر ها در سرور.",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: new PermissionsBitField([
      "SendMessages",
      "ViewChannel"
    ]),
    default_bot_permissions: new PermissionsBitField([
      "SendMessages",
      "EmbedLinks",
      "ViewChannel"
    ]),
    options: MemberCmdOptions
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
          interaction.member instanceof GuildMember && interaction.member.voice
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