import { isBaseInteraction } from "../functions/functions";
import { Respondable } from "../types/types";
import { Message } from "discord.js";
import repeatAction from "./repeatAction";
import error from "./error";

export default async function responseDelete(
  interaction: Respondable,
  message?: Message | null
) {
  try {
    if (isBaseInteraction(interaction)) {
      if ("deleteReply" in interaction)
        return await repeatAction(async () => await interaction.deleteReply().catch(e => e));
    }

    else {
      if (interaction.deletable)
        await interaction.delete().catch(e => e);

      if (message?.deletable)
        await message.delete().catch(e => e);

      return;
    }

    return;
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