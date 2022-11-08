const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const { urlMe } = require("../helper/styles")
const Codechef = require('../public/CodeChef')
const {
  CODECHEF_LOGO,
  CODECHEF_CONTEST_LINK,
  ARENA_LOGO
} = require("../helper/constants");

async function getFutureContests() {
  var CONTEST_URL = "https://api.codechef.com/contests?fields=code,name,startDate,endDate&status=future";
  var token = await Codechef.makeToken();
  console.log(token);
  var params = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Bearer " + token,
    },
  };
  const res = await axios.get(CONTEST_URL, params);
  const dict = await res.data.result.data.content.contestList;
  const exampleEmbed = new MessageEmbed()
    .setColor("#0099ff")
    .setTitle("CONTESTS")
    .setThumbnail(CODECHEF_LOGO)
  exampleEmbed.addFields({
    name: "Future",
    value: "\u200B",
  });
  for (let i in dict) {
    exampleEmbed.addFields({
      name: `${dict[i].name}`,
      value: `Start: ${dict[i].startDate}\nEnd: ${dict[i].endDate}\n${urlMe("See More", CODECHEF_CONTEST_LINK(dict[i].code))}`,
      inline: true,
    });
  }
  exampleEmbed.setFooter({
    text: 'Powered by Arena',
    iconURL: ARENA_LOGO
  })
  return exampleEmbed;
}

module.exports = {
  getFutureContests,
}