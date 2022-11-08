const { MessageEmbed } = require("discord.js");
const { ARENA_LOGO } = require("../helper/constants");

const helpCommand = () => {
  try {
    const embed = new MessageEmbed()
      .setTitle("Help")
      .setColor('#0099ff')
      .setFooter({
        text: 'Powered by Arena',
        iconURL: ARENA_LOGO
      });
    embed.addField("Commands", "`/ping` - Pong!\n`/user` - Get user details\n`/topuser` - Get top users\n`/topusercontest` - Get top users of a contest\n`/contest` - Get contest details\n`/cspresent` - Get present contests\n`/csupcoming` - Get upcoming contests\n`/poll` - Create a poll\n`/help` - Get help");
    return embed;
  }
  catch (err) {
    console.log(err);
    return new MessageEmbed()
      .setTitle("Error")
  }
}
module.exports = helpCommand;