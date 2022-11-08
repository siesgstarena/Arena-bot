const { MessageEmbed } = require('discord.js');
async function createPoll(title, option, interaction) {
  var description = "";
  const alphabates = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🅰️', '🅱️', '🅿️', '🅾️', '🆒', '⤴️', '⤵️', '🆎', '🆓', '🆑', '🆔', '🆘', '🆙', '🆚'];
  if (option.length < alphabates.length) {
    for (let i = 0; i < option.length; i++) {
      description += `${alphabates[i]} ${option[i]}\n\n`
    }
    const user = interaction.user.tag;
    const embed = new MessageEmbed()
      .setTitle(title)
      .setColor('#0099ff')
      .setDescription(description)
      .setFooter({ text: `Poll created by @${user}` });

    const msg = await interaction.reply({
      embeds: [embed],
      fetchReply: true
    });
    for (let i = 0; i < option.length; i++) {
      await msg.react(alphabates[i]);
    }
  } else {
    interaction.reply({
      content: "Options are too many",
    })
  }
}

module.exports = {
  createPoll
}