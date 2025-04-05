import {
  ApplicationCommandType,
  Channel,
  ChannelType,
  EmbedBuilder,
  ForumChannel,
  GuildChannel,
  GuildChannelEditOptions,
  Message,
  PermissionsBitField,
  TextChannel,
  VoiceChannel
} from "discord.js";
import {
  createConfirmationMessage,
  getChannel,
  getOption
} from "../../functions/functions";
import { ChannelCmdOptions } from "../../storage/contants";
import { CommandType } from "../../types/interfaces";
import responseError from "../../utils/responseError";
import HexToNumber from "../../functions/HexToNumber";
import EmbedData from "../../storage/embed";
import response from "../../utils/response";
import yesOrNo from "../../utils/yes-or-no";
import config from "../../../config";
import error from "../../utils/error";

const command: CommandType = {
  data: {
    name: "channel",
    description: "مدیریت چنل‌های سرور.",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: new PermissionsBitField(["ManageChannels"]),
    default_bot_permissions: new PermissionsBitField(["ManageChannels", "ManageRoles", "SendMessages", "EmbedLinks"]),
    options: ChannelCmdOptions
  },
  category: "admin",
  aliases: ["ch"],
  cooldown: 10,
  only_slash: true,
  only_message: true,

  run: async (client, interaction, args) => {
    try {
      if (!interaction.guild) return;
      const
        guild = interaction.guild,
        subcommand = getOption<string>(interaction, "getSubcommand", undefined, 1, args);

      switch (subcommand) {
        case "create": {
          const
            name = getOption<string>(interaction, "getString", "name", 1, args),
            typeStr = getOption<string>(interaction, "getString", "type", 2, args) || "GuildText",
            category = getOption<Channel>(interaction, "getChannel", "category", 3, args),
            nsfw = getOption<boolean>(interaction, "getBoolean", "nsfw", 4, args) || false,
            topic = getOption<string>(interaction, "getString", "topic", 5, args),
            reason = getOption<string>(interaction, "getString", "reason", 6, args);

          if (!name)
            return await responseError(interaction, "❌ لطفاً نام چنل را وارد کنید.");

          const
            confirmMsg = createConfirmationMessage(`❓ آیا مطمئن هستید که یک چنل به نام **${name}** بسازید؟`),
            sentMessage = await response(interaction, confirmMsg);

          return await yesOrNo(interaction, sentMessage!, async (btn) => {
            try {
              const
                newChannel = await guild.channels.create({
                  name,
                  // @ts-ignore
                  type: ChannelType[typeStr],
                  parent: category ? category.id : undefined,
                  nsfw,
                  topic: topic || undefined,
                  reason: reason || undefined
                }),
                embed = new EmbedBuilder()
                  .setColor(HexToNumber(EmbedData.color.green))
                  .setTimestamp()
                  .setFooter({ text: "✅ چنل ساخته شد!" })
                  .setFields([
                    { name: "چنل", value: `**${newChannel}**` },
                    { name: "شناسه", value: `\`${newChannel.id}\`` }
                  ]);

              return await btn.editReply({ embeds: [embed], components: [] });
            } catch (e: any) {
              return await responseError(btn, `❌ ساخت چنل انجام نشد!\n${e.message}`, undefined, true);
            }
          });
        }

        case "slowmode": {
          const
            channel = getChannel(interaction, "channel", 1, args) as TextChannel,
            duration = getOption<number>(interaction, "getInteger", "duration", 2, args),
            do_for_channels = getOption<boolean>(interaction, "getBoolean", "do-for-channels", 3, args),
            reason = getOption<string>(interaction, "getString", "reason", 4, args);

          if (!channel || !duration)
            return await responseError(interaction, "❌ لطفاً چنل و مدت زمان slowmode را مشخص کنید.");

          if (channel.type !== ChannelType.GuildText)
            return await responseError(interaction, "❌ این عملیات تنها برای چنل‌های متنی اعمال می‌شود.");

          const
            confirmMsg = createConfirmationMessage(`❓ آیا مطمئن هستید که slowmode **${duration}** ثانیه را برای چنل **${channel}** تنظیم کنید؟`),
            sentMessage = await response(interaction, confirmMsg),
            editOption: GuildChannelEditOptions = { rateLimitPerUser: duration, reason: reason || undefined };

          return await yesOrNo(interaction, sentMessage!, async (btn) => {
            try {
              let editedChannels: string[] = [];
              if (do_for_channels)
                await Promise.all(
                  (interaction.guild?.channels.cache.filter(a => a.type === ChannelType.GuildText))!
                    .map(async ch => {
                      await ch.edit(editOption)
                      editedChannels.push(ch.id);
                    })
                );

              else
                await channel.edit(editOption);

              const embed = new EmbedBuilder()
                .setColor(HexToNumber(EmbedData.color.green))
                .setTimestamp()
                .setFooter({ text: "✅ Slowmode تنظیم شد!" })
                .setFields([
                  { name: "چنل", value: `**${channel}**` },
                  { name: "مدت زمان", value: `**\`${duration}\` ثانیه**` }
                ]);

              if (do_for_channels)
                embed.setFields([
                  { name: "چنل ها", value: `**${editedChannels.map(a => `<#${a}>`).join(" | ")}**` },
                  { name: "مدت زمان", value: `**\`${duration}\` ثانیه**` }
                ])

              return await btn.editReply({ embeds: [embed], components: [] });
            } catch (e: any) {
              return await responseError(btn, `❌ تنظیم slowmode انجام نشد!\n${e.message}`, undefined, true);
            }
          });
        }

        case "clone": {
          const
            channel = getChannel(interaction, "channel", 1, args) as any,
            reason = getOption<string>(interaction, "getString", "reason", 2, args);

          if (!channel)
            return await responseError(interaction, "❌ لطفاً چنل مورد نظر را مشخص کنید.");

          const
            confirmMsg = createConfirmationMessage(`❓ آیا مطمئن هستید که چنل **${channel.name}** را کلون کنید؟`),
            sentMessage = await response(interaction, confirmMsg);

          return await yesOrNo(interaction, sentMessage!, async (btn) => {
            try {
              const
                cloned = await channel.clone({
                  name: channel.name,
                  permissionOverwrites: channel.permissionOverwrites.cache,
                  parent: channel.parent,
                  position: channel.position + 1,
                  reason: reason || undefined,
                  nsfw: channel.nsfw || undefined,
                  topic: channel.topic || undefined,
                  bitrate: channel.bitrate || undefined,
                  userLimit: channel.userLimit || undefined,
                  defaultAutoArchiveDuration: channel.defaultAutoArchiveDuration || undefined,
                  defaultReactionEmoji: channel.defaultReactionEmoji || undefined,
                  defaultForumLayout: channel.defaultForumLayout || undefined,
                  availableTags: channel.availableTags || undefined,
                  rateLimitPerUser: channel.rateLimitPerUser || undefined
                }),
                embed = new EmbedBuilder()
                  .setColor(HexToNumber(EmbedData.color.green))
                  .setTimestamp()
                  .setFooter({ text: "✅ چنل کلون شد!" })
                  .setFields([
                    { name: "چنل اصلی", value: `**${channel}**` },
                    { name: "چنل کلون شده", value: `**${cloned}**` }
                  ]);

              return await btn.editReply({ embeds: [embed], components: [] });
            } catch (e: any) {
              return await responseError(btn, `❌ عملیات کلون انجام نشد!\n${e.message}`, undefined, true);
            }
          });
        }

        case "edit": {
          const channel = getChannel(interaction, "channel", 1, args) as GuildChannel;
          if (!channel)
            return await responseError(interaction, "❌ لطفاً چنل مورد نظر را مشخص کنید.");

          const
            newName = getOption<string>(interaction, "getString", "name", 2, args),
            topic = getOption<string>(interaction, "getString", "topic", 3, args),
            nsfw = getOption<boolean>(interaction, "getBoolean", "nsfw", 4, args),
            category = getOption<Channel>(interaction, "getChannel", "category", 5, args),
            do_for = getOption<string>(interaction, "getString", "do-for", 6, args),
            reason = getOption<string>(interaction, "getString", "reason", 7, args);

          if (!newName && !topic && nsfw === undefined)
            return await responseError(interaction, "❌ لطفاً حداقل یکی از گزینه‌های ویرایش (نام، موضوع یا NSFW) را وارد کنید.");

          const
            confirmMsg = createConfirmationMessage(`❓ آیا مطمئن هستید که چنل **${channel.name}** را ویرایش کنید؟`),
            sentMessage = await response(interaction, confirmMsg),
            editOption: GuildChannelEditOptions = {
              name: newName || undefined,
              topic: topic || undefined,
              nsfw: nsfw || undefined,
              parent: category?.id || undefined,
              reason: reason || undefined
            };

          return await yesOrNo(interaction, sentMessage!, async (btn) => {
            try {
              let editedChannels: string[] = [];
              if (do_for)
                switch (do_for) {
                  case "all": {
                    await Promise.all(
                      (interaction.guild?.channels.cache)!
                        .map(async ch => {
                          await ch.edit(editOption)
                          editedChannels.push(ch.id);
                        })
                    )
                    break;
                  }

                  case "nsfw": {
                    await Promise.all(
                      (interaction.guild?.channels.cache.filter(a => Object.hasOwn(a, "nsfw")))!
                        .map(async ch => {
                          await ch.edit(editOption)
                          editedChannels.push(ch.id);
                        })
                    )
                    break;
                  }

                  case "text": {
                    await Promise.all(
                      (interaction.guild?.channels.cache.filter(a => a.type === ChannelType.GuildText))!
                        .map(async ch => {
                          await ch.edit(editOption)
                          editedChannels.push(ch.id);
                        })
                    )
                    break;
                  }

                  case "voice": {
                    await Promise.all(
                      (interaction.guild?.channels.cache.filter(a => a.type === ChannelType.GuildVoice))!
                        .map(async ch => {
                          await ch.edit(editOption)
                          editedChannels.push(ch.id);
                        })
                    )
                    break;
                  }

                  case "forum": {
                    await Promise.all(
                      (interaction.guild?.channels.cache.filter(a => a.type === ChannelType.GuildForum))!
                        .map(async ch => {
                          await ch.edit(editOption)
                          editedChannels.push(ch.id);
                        })
                    )
                    break;
                  }
                }

              const
                updated = await channel.edit(editOption),
                embed = new EmbedBuilder()
                  .setColor(HexToNumber(EmbedData.color.green))
                  .setTimestamp()
                  .setFooter({ text: "✅ ویرایش شد!" });

              if (do_for)
                embed.addFields({ name: "چنل ها", value: `**${editedChannels.map(a => `<#${a}>`).join(" | ")}**` });

              if (newName)
                embed.addFields({ name: "نام جدید", value: `**${updated.name}**` });

              if (topic)
                embed.addFields({ name: "موضوع", value: (updated as any)?.topic ? `${(updated as any)?.topic}` : "ندارد" });

              if (category)
                embed.addFields({ name: "کتگوری", value: updated.parentId ? `**<#${updated.parentId}>**` : "ندارد" });

              if (nsfw)
                embed.addFields({ name: "NSFW", value: (updated as any)?.nsfw ? "✅ بله" : "❌ خیر" });

              return await btn.editReply({ embeds: [embed], components: [] });
            } catch (e: any) {
              return await responseError(btn, `❌ عملیات ویرایش انجام نشد!\n${e.message}`, undefined, true);
            }
          });
        }

        case "delete": {
          const channel = getChannel(interaction, "channel", 1, args) as TextChannel;
          if (!channel)
            return await responseError(interaction, "❌ لطفاً چنل مورد نظر را مشخص کنید.");

          const
            confirmMsg = createConfirmationMessage(`❓ آیا مطمئن هستید که چنل **${channel.name}** را حذف کنید؟`),
            sentMessage = await response(interaction, confirmMsg);

          return await yesOrNo(interaction, sentMessage!, async (btn) => {
            try {
              await channel.delete("دستور حذف توسط مدیر");
              const embed = new EmbedBuilder()
                .setColor(HexToNumber(EmbedData.color.green))
                .setTimestamp()
                .setFooter({ text: "✅ چنل حذف شد!" })
                .setFields([{ name: "چنل حذف شده", value: `**${channel.name}**` }]);

              return await btn.editReply({ embeds: [embed], components: [] });
            } catch (e: any) {
              return await responseError(btn, `❌ حذف چنل انجام نشد!\n${e.message}`, undefined, true);
            }
          });
        }

        case "purge": {
          const
            channel = getChannel(interaction, "channel", 1, args) as TextChannel,
            amount = getOption<number>(interaction, "getInteger", "amount", 2, args);

          if (!channel || !amount)
            return await responseError(interaction, "❌ لطفاً چنل و تعداد پیام‌های مورد نظر را مشخص کنید.");

          if (channel.type !== ChannelType.GuildText)
            return await responseError(interaction, "❌ این عملیات تنها برای چنل‌های متنی قابل انجام است.");

          const
            confirmMsg = createConfirmationMessage(`❓ آیا مطمئن هستید که **${amount}** پیام اخیر در چنل **${channel.name}** پاک شوند؟`),
            sentMessage = await response(interaction, confirmMsg);

          return await yesOrNo(interaction, sentMessage!, async (btn) => {
            try {
              await channel.bulkDelete(amount, true);
              const embed = new EmbedBuilder()
                .setColor(HexToNumber(EmbedData.color.green))
                .setTimestamp()
                .setFooter({ text: "✅ پیام‌ها پاکسازی شدند!" })
                .setFields([{ name: "چنل", value: `**${channel.name}**` }]);

              return await btn.editReply({ embeds: [embed], components: [] });
            } catch (e: any) {
              return await responseError(btn, `❌ پاکسازی پیام‌ها انجام نشد!\n${e.message}`, undefined, true);
            }
          });
        }

        case "lock": {
          const channel = getChannel(interaction, "channel", 1, args) as TextChannel;
          if (!channel)
            return await responseError(interaction, "❌ لطفاً چنل مورد نظر را مشخص کنید.");

          const
            action = getOption<string>(interaction, "getString", "action", 2, args), // lock یا unlock
            target = getOption<string>(interaction, "getString", "target", 3, args), // everyone, bots, humans, roles, users
            ids = getOption<string>(interaction, "getString", "ids", 4, args), // برای roles یا users
            reason = getOption<string>(interaction, "getString", "reason", 5, args);

          if (!action || !target)
            return await responseError(interaction, "❌ لطفاً عمل (lock/unlock) و هدف را مشخص کنید.");

          const
            confirmMsg = createConfirmationMessage(`❓ آیا مطمئن هستید که چنل **${channel.name}** را برای **${target}** ${action === "lock" ? "قفل" : "باز"} کنید؟`),
            sentMessage = await response(interaction, confirmMsg);

          return await yesOrNo(interaction, sentMessage!, async (btn) => {
            try {
              if (target === "everyone") {
                await channel.permissionOverwrites.edit(guild.id, {
                  SendMessages: action === "lock" ? false : null
                }, { reason: reason || undefined });
              }

              else if (target === "bots" || target === "humans") {
                const members = guild.members.cache.filter(m =>
                  m.voice.channel && // در صورت نیاز، می‌توان به کانال اشاره کرد
                  (target === "bots" ? m.user.bot : !m.user.bot)
                );
                for (const member of members.values()) {
                  await channel.permissionOverwrites.edit(member.id, {
                    SendMessages: action === "lock" ? false : null
                  }, { reason: reason || undefined });
                }
              }

              else if ((target === "roles" || target === "users") && ids) {
                const idList = ids.split(",").map(id => id.trim());
                for (const id of idList) {
                  await channel.permissionOverwrites.edit(id, {
                    SendMessages: action === "lock" ? false : null
                  }, { reason: reason || undefined });
                }
              }

              else
                return await responseError(interaction, "❌ مقادیر وارد شده برای target یا ids معتبر نیست.");

              const embed = new EmbedBuilder()
                .setColor(HexToNumber(EmbedData.color.green))
                .setTimestamp()
                .setFooter({ text: `✅ چنل ${channel.name} ${action === "lock" ? "قفل" : "باز"} شد!` })
                .setFields([
                  { name: "عمل", value: `**${action === "lock" ? "قفل کردن" : "باز کردن"}**` },
                  { name: "هدف", value: `**${target}**` }
                ]);

              return await btn.editReply({ embeds: [embed], components: [] });
            } catch (e: any) {
              return await responseError(btn, `❌ عملیات ${action === "lock" ? "قفل کردن" : "باز کردن"} انجام نشد!\n${e.message}`, undefined, true);
            }
          });
        }

        default: {
          if (interaction instanceof Message) {
            const prefix = config.discord.prefix,
              embed = new EmbedBuilder()
                .setTitle(`📋 لیست ساب‌کامندهای ${prefix}${command.data.name}`)
                .setColor(HexToNumber(EmbedData.color.theme))
                .setDescription("لطفاً یکی از ساب‌کامندهای زیر را انتخاب کنید:")
                .setFooter({ text: "برای استفاده از هر ساب‌کامند، دستور مورد نظر را وارد کنید." });

            command.data.options!.forEach(cmd => {
              embed.addFields({ name: cmd.name, value: cmd.description });
            });
            return await response(interaction, { embeds: [embed], ephemeral: true });
          }

          else
            return await responseError(interaction, "❌ ساب‌کامند نامعتبر است. لطفاً از گزینه‌های موجود استفاده کنید.");

        }
      }
    } catch (e: any) {
      error(e);
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