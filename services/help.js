const { MessageEmbed } = require("discord.js");
const { error } = require("../config/winston");
const { ARENA_LOGO } = require("../helper/constants");
const { mentionSlashCommand } = require("../helper/styles");

const helpCommand = () => {
  try {
    const embed = new MessageEmbed()
      .setTitle("Help")
      .setColor('#0099ff')
      .setFooter({
        text: 'Powered by Arena',
        iconURL: ARENA_LOGO
      });
    embed.addField("Commands", `${mentionSlashCommand('user','1040155899421020160')}\nGet the profile details\n\n${mentionSlashCommand('topuser','1040155991817343026')}\nGet top users details\n\n${mentionSlashCommand('topusercontest','1040155990877798461')}\nGet top users of a contest\n\n${mentionSlashCommand('contest','1040155900670918666')}\nGet contest details of Arena\n\n${mentionSlashCommand('cspresent','1040155901249728552')}\nGet CodeChef present contests\n\n${mentionSlashCommand('csupcoming','1040155902252175420')}\nGet CodeChef upcoming contests\n\n${mentionSlashCommand('poll','1040155990072500234')}\nCreate a poll\n`);
    return embed;
  }
  catch (err) {
    error.error(err);
    return new MessageEmbed()
      .setTitle("Error")
  }
}
module.exports = helpCommand;