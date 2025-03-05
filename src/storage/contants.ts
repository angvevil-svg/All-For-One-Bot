import { ApplicationCommandOptionType, ChannelType, PermissionsBitField } from "discord.js";
import { CommandOptions } from "../types/types";
import { CommandOption } from "../types/interfaces";

// Single options
export const
  EphemeralOption = function (required = false): CommandOption {
    return {
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
      required
    };
  },
  ReasonOption = function (required = false): CommandOption {
    return {
      name: "reason",
      description: "دلیل را ذکر کنید.",
      type: ApplicationCommandOptionType.String,
      required
    };
  },
  UserOption = function (required = false, name = "user", description = "کاربر را وارد کنید."): CommandOption {
    return {
      name,
      description,
      type: ApplicationCommandOptionType.User,
      required
    }
  },
  RoleOption = function (required = false, name = "role", description = "رول را وارد کنید."): CommandOption {
    return {
      name,
      description,
      type: ApplicationCommandOptionType.Role,
      required
    };
  },
  TimeOption = function (required = false): CommandOption {
    return {
      name: "time",
      description: "زمان فعال بودن عملگر بر روی کاربر را مشخص کنید.",
      type: ApplicationCommandOptionType.String,
      required
    };
  },
  ForAllOption = function (required = false): CommandOption {
    return {
      name: "for-all",
      description: "انجام فعالیت روی همه ممبر ها.",
      type: ApplicationCommandOptionType.Boolean,
      required
    };
  };

// Multi options
export const

  // (/)member command
  MemberCmdOptions: CommandOptions = [
    {
      name: "ban",
      description: "بن ممبر از سرور.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "BanMembers"
      ]),
      default_member_permissions: new PermissionsBitField([
        "BanMembers"
      ]),
      options: [
        UserOption(),
        ForAllOption(),
        {
          name: "undo",
          description: "آن بن یوزر در سرور.",
          type: ApplicationCommandOptionType.Boolean,
          required: false
        },
        ReasonOption(),
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
        TimeOption(),
        EphemeralOption()
      ]
    },
    {
      name: "kick",
      description: "اخراج ممبر از سرور.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "KickMembers"
      ]),
      default_member_permissions: new PermissionsBitField([
        "KickMembers"
      ]),
      options: [
        UserOption(),
        ForAllOption(),
        ReasonOption(),
        EphemeralOption()
      ]
    },
    {
      name: "timeout",
      description: "قفل ممبر در سرور.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "ModerateMembers"
      ]),
      default_member_permissions: new PermissionsBitField([
        "ModerateMembers"
      ]),
      options: [
        UserOption(),
        ForAllOption(),
        {
          name: "undo",
          description: "باز کردن قفل یوزر در سرور.",
          type: ApplicationCommandOptionType.Boolean,
          required: false
        },
        ReasonOption(),
        TimeOption(),
        EphemeralOption()
      ]
    },
    {
      name: "infromation",
      type: ApplicationCommandOptionType.Subcommand,
      description: "نمایش اطلاعات کامل ممبر در سرور.",
      options: [
        UserOption(),
        EphemeralOption()
      ]
    },
    {
      name: "clear",
      description: "گرفتن تمامی دسترسی های ممبر.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "ModerateMembers"
      ]),
      default_member_permissions: new PermissionsBitField([
        "ModerateMembers"
      ]),
      options: [
        UserOption(),
        ForAllOption(),
        ReasonOption(),
        EphemeralOption()
      ]
    },
    {
      name: "nickname",
      description: "تغییر نیک نیم ممبر.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "ManageNicknames"
      ]),
      default_member_permissions: new PermissionsBitField([
        "ManageNicknames"
      ]),
      options: [
        UserOption(),
        ForAllOption(),
        {
          name: "input",
          description: "نیک نیم خود را وارد کنید.",
          type: ApplicationCommandOptionType.String,
          required: false
        },
        ReasonOption(),
        EphemeralOption()
      ]
    }
  ],

  // (/)voice command
  VoiceCmdOptions: CommandOptions = [
    {
      name: "mute",
      description: "بی صدا کردن ممبر در ویس.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "MuteMembers"
      ]),
      default_member_permissions: new PermissionsBitField([
        "MuteMembers"
      ]),
      options: [
        UserOption(),
        ForAllOption(),
        {
          name: "undo",
          description: "باز کردن صدای ممبر در ویس.",
          type: ApplicationCommandOptionType.Boolean,
          required: false
        },
        ReasonOption(),
        TimeOption(),
        EphemeralOption()
      ]
    },
    {
      name: "deaf",
      description: "کر کردن ممبر در ویس.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "DeafenMembers"
      ]),
      default_member_permissions: new PermissionsBitField([
        "DeafenMembers"
      ]),
      options: [
        UserOption(),
        ForAllOption(),
        {
          name: "undo",
          description: "باز کردن شنوایی ممبر در ویس.",
          type: ApplicationCommandOptionType.Boolean,
          required: false
        },
        ReasonOption(),
        TimeOption(),
        EphemeralOption()
      ]
    },
    {
      name: "move",
      description: "جا به جایی ممبر از ویس به ویس مدنظر.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "MoveMembers"
      ]),
      default_member_permissions: new PermissionsBitField([
        "MoveMembers"
      ]),
      options: [
        UserOption(),
        ForAllOption(),
        {
          name: "to",
          description: "ویس چنلی را انتخاب کنید.",
          type: ApplicationCommandOptionType.Channel,
          channel_types: [ChannelType.GuildVoice],
          required: true
        },
        ReasonOption(),
        EphemeralOption()
      ]
    },
    {
      name: "request-to-speak",
      description: "آوردن کاربر به بالای استیج چنل.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "RequestToSpeak"
      ]),
      default_member_permissions: new PermissionsBitField([
        "RequestToSpeak"
      ]),
      options: [
        UserOption(),
        ForAllOption(),
        {
          name: "undo",
          description: "پایین آوردن ممبر از استیج.",
          type: ApplicationCommandOptionType.Boolean,
          required: false
        },
        ReasonOption(),
        EphemeralOption()
      ]
    },
    {
      name: "disconnect",
      description: "دیسی کردن ممبر از ویس چنل.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "ModerateMembers"
      ]),
      default_member_permissions: new PermissionsBitField([
        "ModerateMembers"
      ]),
      options: [
        UserOption(),
        ForAllOption(),
        ReasonOption(),
        EphemeralOption()
      ]
    }
  ],

  // (/)role command
  RoleCmdOptions: CommandOptions = [
    {
      name: "information",
      description: "نمایش اطلاعات رول.",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        RoleOption(true),
        EphemeralOption()
      ]
    },
    {
      name: "create",
      description: "ساخت رول.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "ManageRoles"
      ]),
      default_member_permissions: new PermissionsBitField([
        "ManageRoles"
      ]),
      options: [
        {
          name: "name",
          description: "نام رول جدید را وارد کنید.",
          type: ApplicationCommandOptionType.String,
          required: true
        },
        {
          name: "icon",
          description: "آیکون رول جدید را آپلود کنید.",
          type: ApplicationCommandOptionType.Attachment,
          required: false
        },
        {
          name: "hoist",
          description: "آیا رول قابل نمایش در لیست ممبر ها باشد؟",
          type: ApplicationCommandOptionType.Boolean,
          required: false
        },
        {
          name: "mentionable",
          description: "آیا همه بتوانند رول را منشن کنند؟",
          type: ApplicationCommandOptionType.Boolean,
          required: false
        },
        {
          name: "color",
          description: "رنگ رول جدید را وارد کنید.",
          type: ApplicationCommandOptionType.String,
          required: false
        },
        {
          name: "position",
          description: "رنگ رول جدید را وارد کنید.",
          type: ApplicationCommandOptionType.String,
          autocomplete: true,
          required: false
        },
        ReasonOption(),
        EphemeralOption()
      ]
    },
    {
      name: "clone",
      description: "ساخت رول مشابد از رول مشخص.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "ManageRoles"
      ]),
      default_member_permissions: new PermissionsBitField([
        "ManageRoles"
      ]),
      options: [
        RoleOption(true),
        ReasonOption(),
        EphemeralOption()
      ]
    },
    {
      name: "add",
      description: "اضافه کردن رول به ممبر یا ممبر ها.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "ManageRoles"
      ]),
      default_member_permissions: new PermissionsBitField([
        "ManageRoles"
      ]),
      options: [
        RoleOption(true),
        UserOption(),
        RoleOption(false, "to-everyone-have", "اضافه کردن رول به تمامی کسایی این رول را دارند."),
        {
          name: "to",
          description: "اضافه کردن رول به چه کسایی؟",
          type: ApplicationCommandOptionType.String,
          choices: [
            {
              name: "Humans",
              value: "humans"
            },
            {
              name: "Bots",
              value: "bots"
            },
            {
              name: "Everyone",
              value: "everyone"
            }
          ],
          required: false
        },
        ReasonOption(),
        EphemeralOption()
      ]
    },
    {
      name: "copy",
      description: "کپی کردن رول های ممبر به ممبر یا ممبر ها.",
      type: ApplicationCommandOptionType.Subcommand,
      default_bot_permissions: new PermissionsBitField([
        "ManageRoles"
      ]),
      default_member_permissions: new PermissionsBitField([
        "ManageRoles"
      ]),
      options: [
        UserOption(true, "from", "کپی رول های این ممبر."),
        UserOption(false, "to-user", "کپی رول های ممبر به این ممبر."),
        RoleOption(false, "to-everyone-have", "کپی کردن رول به تمامی کسایی این رول را دارند."),
        {
          name: "to",
          description: "اضافه کردن رول به چه کسایی؟",
          type: ApplicationCommandOptionType.String,
          choices: [
            {
              name: "Humans",
              value: "humans"
            },
            {
              name: "Bots",
              value: "bots"
            },
            {
              name: "Everyone",
              value: "everyone"
            }
          ],
          required: false
        },
        ReasonOption(),
        EphemeralOption()
      ]
    }
  ];

/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */
