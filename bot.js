const {Client,Intents} = require('discord.js');
require('dotenv').config();
const client = new Client({ 
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials : ['MESSAGE']
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.content === '$ping') {
        message.channel.send('pong');
    }
    else if(message.content === '$dev-mem'){
        message.member.roles.add("994184063244050482");
    }
});

client.login(process.env.BOT_TOKEN);