const { MessageEmbed } = require("discord.js");
const { error } = require("../config/winston");
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
    embed.addField("Commands", "`/user` - Get the profile details\n`/topuser` - Get top users details\n`/topusercontest` - Get top users of a contest\n`/contest` - Get contest details of Arena\n`/cspresent` - Get CodeChef present contests\n`/csupcoming` - Get CodeChef upcoming contests\n`/poll` - Create a poll\n`/help` - Get help");
    return embed;
  }
  catch (err) {
    error.error(err);
    return new MessageEmbed()
      .setTitle("Error")
  }
}
module.exports = helpCommand;