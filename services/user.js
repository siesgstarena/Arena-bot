const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { boldMe } = require('../helper/styles')
const {ARENA_LOGO,ARENA_DEFAULT_PROFILE_LOGO,ARENA_USER_PROFILE,GITHUB_PROFILE_IMAGE,ARENA_HEADER} = require('../helper/constants');

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
        const res = await axios.get(`http://arena.siesgst.ac.in/api/user?username=${username}`, { headers: ARENA_HEADER });
        const user = res.data;
        const exampleEmbed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle('User Info')
            .setAuthor({
                name: `${username}`, iconURL: ARENA_LOGO, url: `${ARENA_USER_PROFILE(user._id)}`
            })
            .setDescription(`${boldMe("Name")}\n${user.name}`)
            .setThumbnail(`${user.githubLink ? GITHUB_PROFILE_IMAGE(user.githubLink) : ARENA_DEFAULT_PROFILE_LOGO}`)
            .addFields(
                { name: 'Ratings', value: `${user.ratings}` },
                { name: 'Accepted', value: `${user.submissionStats.accepted}`, inline: true },
                { name: 'Wrong Answer', value: `${user.submissionStats.wrongAnswer}`, inline: true },
            )
            .setImage(makeProfileGraph(user.rantingChange).getUrl())
            .setTimestamp()
            .setFooter({
                text: 'Powered by Arena',
                iconURL: ARENA_LOGO
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
