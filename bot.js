const { Client, Intents, Constants } = require('discord.js');
require('dotenv').config();
const { MessageEmbed } = require('discord.js');
const fetchUser = require('./services/user');
const initCommands = require('./commands');
const { showContest } = require('./services/contest');
const { getPresentContests } = require('./services/cspresent');
const { getFutureContests } = require('./services/csupcoming');
const { PREVILAGE_TO_GIVE_ROLES } = require('./helper/constants');
const {createPoll} = require('./services/poll');
const fetchTopCoders = require('./services/topCodersContest');
const GENERAL_CHANNEL = "994182456913702924"


const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ['MESSAGE']
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);


    const guild = client.guilds.cache.get(GENERAL_CHANNEL);
    let commands
    if (guild) {
        commands = guild.commands
    }
    else {
        commands = client.application.commands
    }
    initCommands(commands)
});


client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const { commandName, options } = interaction;
    if (commandName === 'ping') {
        interaction.reply({
            content: 'pong',
        })
    }
    else if (commandName === 'user') {
        const username = options.getString('username');
        const user = await fetchUser(username);
        interaction.reply({
            embeds: [user],
        })
    }
    else if(commandName === 'topusercontest'){
        const contestCode = options.getString('contest');
        const limit = options.getNumber('limit');
        const topCoders = await fetchTopCoders(contestCode,limit);
        interaction.reply({
            embeds: [topCoders],
        })
    }
    else if (commandName === "contest") {
        const UpcomingContest = await showContest();
        interaction.reply({
            embeds: [UpcomingContest],
        });
    }
    else if (commandName === "cspresent") {
        try {

            const presentCodechefContest = await getPresentContests();
            interaction.reply({
                embeds: [presentCodechefContest],
            });
        }
        catch (err) {
            console.log(err)
            interaction.reply({
                content: "Something went wrong",
            });
        }
    }
    else if (commandName === "csupcoming") {
        try {

            const futureCodechefContest = await getFutureContests();
            interaction.reply({
                embeds: [futureCodechefContest],
            });
        } catch (err) {
            console.log(err)
            interaction.reply({
                content: "Something went wrong",
            });
        }
    }
    else if (commandName === "roles") {
        try {
            if (interaction.member.roles.cache.has(...PREVILAGE_TO_GIVE_ROLES)) {
                const role = options.getRole('role')
                const user = options.getUser('user')
                const member = interaction.guild.members.cache.get(user.id)
                console.log(role)
                await member.roles.add(role)
                interaction.reply({
                    content: `<@${user.id}> has been given the role @${role.name}`,
                });
            }
            else {
                interaction.reply({
                    content: "Oops you don't have permissions to do that!",
                });
            }
        } catch (err) {
            console.log(err)
            interaction.reply({
                content: "Something went wrong",
            });
        }
    }
    else if (commandName === "rmrole") {
        try {
            if (interaction.member.roles.cache.has(...PREVILAGE_TO_GIVE_ROLES)) {
                const role = options.getRole('role')
                const user = options.getUser('user')
                const member = interaction.guild.members.cache.get(user.id)
                console.log(role)
                await member.roles.remove(role)
                interaction.reply({
                    content: `<@${user.id}> has been remove the role @${role.name}`,
                });
            }
            else {
                interaction.reply({
                    content: "Oops you don't have permissions to do that!",
                });
            }
        } catch (err) {
            console.log(err)
            interaction.reply({
                content: "Something went wrong",
            });
        }
    }
    else if (commandName === "poll") {
        const title = options.getString('title');
        const option = options.getString('options').split(',');
        await createPoll(title, option, interaction)
    }

})
// client.on('messageCreate', async message => {
//     if (message.content === '$ping') {
//         message.channel.send('pong');
//     }
//     else if (message.content === '$dev-mem') {
//         message.member.roles.add("994184063244050482");
//     }
//     else if (message.content.startsWith('$user')) {
//         console.log(message.author.username);
//         const username = message.content.split(" ")[1];
//         if (username === undefined) {
//             message.channel.send("Please provide a username");
//         }
//         else {
//             const embededUser = await fetchUser(username);
//             // console.log(embededUser);
//             message.channel.send({ embeds: [embededUser] });
//         }
//     }
// });

client.login(process.env.BOT_TOKEN);