import { CommandInteraction, InteractionReplyOptions, Message, MessageReplyOptions } from "discord.js";
import error from "./error";

export default async function response(interaction: CommandInteraction | Message, data: InteractionReplyOptions | MessageReplyOptions) {
  try {
    if (interaction instanceof CommandInteraction)
      return await interaction.editReply(data as InteractionReplyOptions);

    else return await interaction.reply(data as MessageReplyOptions);
  } catch (e: any) {
    error(e);
  }
}
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */