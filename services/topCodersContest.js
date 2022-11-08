const { default: axios } = require("axios");
const { MessageEmbed } = require("discord.js");
const { ARENA_HEADER, ARENA_LOGO, ARENA_USER_PROFILE } = require("../helper/constants");

const fetchTopCoders = async (contestCode, limit = 5) => {
    try {

        const url = `http://arena.siesgst.ac.in/api/topusers/${contestCode}?limit=${limit}`;
        const response = await axios.get(url,{ headers: ARENA_HEADER });
        const topCoders = response.data;
        console.log(topCoders,topCoders.length);
        const embed = new MessageEmbed()
            .setTitle(`Top ${topCoders.length} coders of ${contestCode}`)
            .setColor('#0099ff')
            .setFooter({
                text: 'Powered by Arena',
                iconURL: ARENA_LOGO
            });
        for (let i = 0; i <= topCoders.length -1; i++) {
            const coder = topCoders[i];
            console.log(coder.username);
            embed.addField(`No. ${i+1}`,`[${coder.username}](${ARENA_USER_PROFILE(coder._id)})`);
            embed.addField('Points',`${coder.total}`);
            embed.addField('Solved',`${coder.solved}`);
        }
        return embed;
    }
    catch (err) {
        console.log(err);
        return new MessageEmbed()
            .setTitle("Error")
    }
}

module.exports = fetchTopCoders;