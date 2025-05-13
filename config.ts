const config = {
    api: {
        // https://nekos.life/api/v2/endpoints
        nekos: {
            url: "https://nekos.life/api",
            endpoints: {
                // Random Anime Sences Gif
                anime_gif: {
                    pat: "/v2/img/pat", // Anime Gif (url)
                    hug: "/v2/img/hug", // Anime Gif (url)
                    kiss: "/v2/img/kiss", // Anime Gif (url)
                    smug: "/v2/img/smug", // Anime Gif (url)
                    cuddle: "/v2/img/cuddle", // Anime Gif (url)
                    slap: "/v2/img/slap", // Anime Gif (url)
                    feed: "/v2/img/feed", // Anime Gif (url)
                    tickle: "/v2/img/tickle", // Anime Gif (url)
                    spank: "/v2/img/spank", // Anime Gif (url)
                    neko_gif: "/v2/img/ngif"
                }, // Anime Gif (url)

                // Random Anime Pictures
                anime_image: {
                    neko_image: "/v2/img/neko", // Anime Image (url)
                    fox_girl: "/v2/img/fox_girl", // Anime Image (url)
                    waifu: "/v2/img/waifu", // Anime Image (url)
                    gasm: "/v2/img/gasm", // Anime Image (url)
                    gecg: "/v2/img/gecg", // Anime Image (url)
                    avatar: "/v2/img/avatar", // Anime Image (url)
                    wallpaper: "/v2/img/wallpaper"
                }, // Anime Image (url)

                // Fun
                fun: {
                    _8ball: "/v2/8ball", // "response" random text, "url" that text's image
                    why: "/v2/why", // "why"
                    cat_to_text: "/v2/cat", // "cat"
                    fact: "/v2/fact", // "fact"
                    name: "/v2/name", // "name"
                    owoify: "/v2/owoify/text=", // "owo" make text to funny text contains owo chars.
                    spoiler: "/v2/spoiler/text="
                }, // "owo" make text to hidden text works in discord chats.

                // Random Animal Pictures
                animal_image: {
                    lizard: "/v2/img/lizard", // Animal Image (url) 
                    dog: "/v2/img/woof", // Animal Image (url) 
                    goose: "/v2/img/goose", // Animal Image (url) 
                    cat: "/v2/img/meow"
                } // Animal Image (url) 
            }
        },

        // https://docs.nekobot.xyz
        nekobot: {
            url: "https://nekobot.xyz/api",
            endpoints: {
                // /image The type of image to get. Current types: hass, hmidriff, pgif, 4k, hentai, holo, hneko, neko, hkitsune, kemonomimi, anal, hanal, gonewild, kanna, ass, pussy, thigh, hthigh, gah, coffee, food, paizuri, tentacle, boobs, hboobs, yaoi, donator types: cosplay, swimsuit, pantsu, nakadashi

                // /imagegen?type= [threats, baguette, clyde] text	string Text to clydify.
                // raw	int	
                // &raw=1 to get raw image bytes
                // /imagegen?type=ship
                // user1	string	
                // User 1’s avatar
                // user2	string	
                // User 2’s avatar
                // raw	int	
                // &raw=1 to get raw image bytes
                nsfw: {
                    ass: "/image?type=ass",
                    anal: "/image?type=anal"
                },
                anime: {
                    nsfw: {
                        ass: "/image?type=hass"
                    }
                }
            }
        }
    },
    source: {
        anti_crash: process.env.anti_crash === "true" ? true : false || false, // Anticrash on or off
        logger: process.env.logger === "true" ? true : false || false, // Webhook logger on or off
        dashboard: {
            on: process.env.dashboard === "true" ? true : false || false, // Dashboad on or off
            port: process.env.dashboard_port || 3000, // Dashboard port server.
            host: process.env.dashboard_host || "http://localhost:" + process.env.dashboard_port || 3000 // Dashboard host url.
        },
        database: {
            type: process.env.database_type || "", // Choose one type for save users and guilds data. Types: "mysql" | "sql" | "mongodb" | "json"
            mongoURL: process.env.database_mongoURL || "", // If you choose "mongodb" type place your mongo url.
            mysql: {
                host: process.env.database_msql_host || "", // Place your Mysql server host name.
                user: process.env.database_msql_user || "", // Place your Mysql server username.
                password: process.env.database_msql_password || "", // Place your Mysql server password.
                database: process.env.database_msql_database || "" // Place your Mysql server database name.
            } // If you choose "mysql" type place your Mysql server information.
        }
    },
    discord: {
        default_language: process.env.default_language || "en", // Bot default language in discord.
        one_guild: process.env.one_guild === "true" ? true : false || false, // One Guild on or off
        delete_commands: process.env.delete_commands === "true" ? true : false || false, // Delete slash commands each time you run the source.
        status_loop: parseInt(process.env.status_loop_count!) || 30 * 1000, // Bot status loop. (By default it's every 30 seconds)
        token: process.env.token || "", // Bot token.
        prefix: process.env.prefix || "", // Bot message command prefix.
        status: {
            activity: JSON.parse(process.env.status_activity || "[]") || [], // Set bot status activity, you can change it. | You can use "{members}" variable to shows bot all users or {servers} to shows counts of all servers bot joined.
            type: JSON.parse(process.env.status_type || "[]") || [], // Set bot status type and it"s can be: "Competing" | "Listening" | "Playing" | "Streaming" | "Watching" | "Custom"
            presence: JSON.parse(process.env.status_presence || "[]") || [] // Set bot status presence and it"s can be: "online" | "dnd" | "idle" | "offline"
        },
        noperms_invite: "https://discord.com/api/oauth2/authorize?scope=bot+applications.commands&client_id={clientId}", // Discord bot invite link with no permission.
        admin_invite: "https://discord.com/api/oauth2/authorize?scope=bot+applications.commands&client_id={clientId}&permissions=8", // Discord bot invite link with administrator permission.
        default_invite: "https://discord.com/api/oauth2/authorize?scope=bot+applications.commands&client_id={clientId}&permissions=3230729", // Discord bot invite link with recommended permission.
        support: {
            invite: process.env.support_url || "https://discord.gg/AfkuXgCKAQ", // Support server invite link.
            id: process.env.support_id || "", // Support server Id.
            stats_channel: process.env.support_stats || "", // Id of  channel to send bot stats on discord.
            webhook: {
                url: process.env.webhook_url || "", // Webhook logger url.
                avatar: process.env.webhook_avatar || "", // Webhook logger avatar.
                username: process.env.webhook_username || "", // Webhook logger username.
                threads: {
                    status: process.env.webhook_thread_status || "", // Id of thread for webhook to bot status alerts.
                    bugs: process.env.webhook_thread_bugs || "", // Id of thread for webhook to send console errors.
                    report: process.env.webhook_thread_report || "" // Id of thread for webhook to send users report messages.
                }
            },
            owners: JSON.parse(process.env.owners || "[]") || [] // Source owners.
        }
    }
};

export default config;
/**
 * @copyright
 * Code by Sobhan-SRZA (mr.sinre) | https://github.com/Sobhan-SRZA
 * Developed for Persian Caesar | https://github.com/Persian-Caesar | https://dsc.gg/persian-caesar
 *
 * If you encounter any issues or need assistance with this code,
 * please make sure to credit "Persian Caesar" in your documentation or communications.
 */