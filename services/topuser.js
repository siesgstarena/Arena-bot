const { default: axios } = require("axios");
const { MessageEmbed } = require("discord.js");
const { error } = require("../config/winston");
const { ARENA_HEADER, ARENA_LOGO, ARENA_USER_PROFILE } = require("../helper/constants")

const fetchTopUsers = async (limit = 5) => {
  try {

    const res = await axios.get(`http://arena.siesgst.ac.in/api/topusers?limit=${limit}`, { headers: ARENA_HEADER })
    const data = res.data;
    const embed = new MessageEmbed()
      .setTitle(`Top ${data.length} Coders of All Time`)
      .setColor('#0099ff')
      .setFooter({
        text: 'Powered by Arena',
        iconURL: ARENA_LOGO
      });
    for (let i = 0; i <= data.length - 1; i++) {
      const user = data[i];
      embed.addField(`No. ${i + 1}`, `[${user.username}](${ARENA_USER_PROFILE(user._id)})`);
      embed.addField('Ratings', `${user.ratings}`);
    }
    return embed;
  }
  catch (err) {
    error.error(err);
    return new MessageEmbed()
      .setTitle("Error")
  }

}
module.exports = fetchTopUsers;