const { Constants } = require('discord.js');
module.exports = {
  Integer: Constants.ApplicationCommandOptionTypes.INTEGER,
  String: Constants.ApplicationCommandOptionTypes.STRING,
  Boolean: Constants.ApplicationCommandOptionTypes.BOOLEAN,
  USER: Constants.ApplicationCommandOptionTypes.USER,
  CHANNEL: Constants.ApplicationCommandOptionTypes.CHANNEL,
  ROLE: Constants.ApplicationCommandOptionTypes.ROLE,
  Number: Constants.ApplicationCommandOptionTypes.NUMBER,
}