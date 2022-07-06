const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { boldMe } = require('../helper/index')
const HEADER = {
    "Accept": "application/vnd.arena+json;version=1",
}
const ARENA_LOGO = "https://res.cloudinary.com/siesgstarena/image/upload/f_auto,q_auto/c_scale,h_64,w_60/v1599156841/arena/assets/arena.png"
const ARENA_DEFAULT_PROFILE_LOGO = "https://res.cloudinary.com/siesgstarena/image/upload/f_auto,q_auto/v1546283328/arena/assets_webp/gravatar.webp"
const QuickChart = require('quickchart-js');

const makeProfileGraph = (rantingChange) => {
    console.log(rantingChange);
    var xValues = [];
    var yValues = [];
    rantingChange.map(val => {
        xValues.push(val.contestCode)
        yValues.push(val.ratings)
    })
    console.log(xValues);
    console.log(yValues);
    const chart = new QuickChart();
    chart
        .setConfig({
            type: 'line',
            data: {
                labels: xValues,
                datasets: [{
                    fill: false,
                    lineTension: 0,
                    backgroundColor: "rgba(0,0,255,1.0)",
                    borderColor: "rgba(0,0,255,0.1)",
                    label: "Rating",
                    data: yValues
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        })
    return chart;
}
const fetchUser = async (username) => {
    try {
        const res = await axios.get(`http://arena.siesgst.ac.in/api/user?username=${username}`, { headers: HEADER });
        const user = res.data;
        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('User Info')
            .setAuthor({
                name: `${username}`, iconURL: ARENA_LOGO, url: `http://arena.siesgst.ac.in/profile/${user._id}`
            })
            .setDescription(`${boldMe("Name")}\n${user.name}`)
            .setThumbnail(`${user.githubLink ? "https://www.github.com/" + user.githubLink + ".png?size=500" : ARENA_DEFAULT_PROFILE_LOGO}`)
            .addFields(
                { name: 'Ratings', value: `${user.ratings}` },
                { name: 'Accepted', value: `${user.submissionStats.accepted}`, inline: true },
                { name: 'Wrong Answer', value: `${user.submissionStats.wrongAnswer}`, inline: true },
            )
            .setImage(makeProfileGraph(user.rantingChange).getUrl())
            .setTimestamp()
            .setFooter({
                text: 'Thanks For Using Me', iconURL: `https://www.github.com/${user.githubLink}.png?size=500`
            });
        return exampleEmbed;
    }
    catch (err) {
        console.log(err);
        return new MessageEmbed()
            .setTitle("Error")
    }
}
module.exports = fetchUser;
