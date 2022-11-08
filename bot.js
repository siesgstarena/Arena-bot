const { Client, Intents } = require('discord.js');
require('dotenv').config();
const fetchUser = require('./services/user');
const initCommands = require('./commands');
const { showContest } = require('./services/contest');
const { getPresentContests } = require('./services/cspresent');
const { getFutureContests } = require('./services/csupcoming');
const { PREVILAGE_TO_GIVE_ROLES } = require('./helper/constants');
const { createPoll } = require('./services/poll');
const fetchTopCoders = require('./services/topCodersContest');
const fetchTopUsers = require('./services/topuser');
const helpCommand = require('./services/help');
const {log,error} = require('./config/winston');
const GENERAL_CHANNEL = "994182456913702924"

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ['MESSAGE']
});

client.on('ready', () => {
  log.info(`Logged in as ${client.user.tag}!`);

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
  if (commandName === 'user') {
    const username = options.getString('username');
    const user = await fetchUser(username);
    interaction.reply({
      embeds: [user],
    })
  }
  else if (commandName === 'topusercontest') {
    const contestCode = options.getString('contest');
    const limit = options.getNumber('limit');
    const topCoders = await fetchTopCoders(contestCode, limit);
    interaction.reply({
      embeds: [topCoders],
    })
  }
  else if (commandName === 'topuser') {
    const limit = options.getNumber('limit');
    const topUsers = await fetchTopUsers(limit);
    interaction.reply({
      embeds: [topUsers],
    })
  }
  else if (commandName === "contest") {
    const UpcomingContest = await showContest();
    interaction.reply({
      embeds: [UpcomingContest],
    });
  }
  else if (commandName === "help") {
    const help = helpCommand();
    interaction.reply({
      embeds: [help],
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
      error.error(err);
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
      error.error(err);
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
        log.info(member)
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
      error.error(err);
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
        log.info(member)
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
      error.error(err);
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

client.login(process.env.BOT_TOKEN);