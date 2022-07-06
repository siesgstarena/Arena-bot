const {Client,Intents} = require('discord.js');
require('dotenv').config();
const fetchUser = require('./services/user');
const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials : ['MESSAGE']
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate',async message => {
    if (message.content === '$ping') {
        message.channel.send('pong');
    }
    else if(message.content === '$dev-mem'){
        message.member.roles.add("994184063244050482");
    }
    else if(message.content.startsWith('$user')){
        console.log(message.author.username);
        const username = message.content.split(" ")[1];
        if (username === undefined) {
            message.channel.send("Please provide a username");
        }
        else{
            const embededUser = await fetchUser(username);
            // console.log(embededUser);
            message.channel.send({ embeds: [embededUser] });
        }
    }
});

client.login(process.env.BOT_TOKEN);