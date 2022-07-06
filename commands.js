const  {String}  = require('./helper/datatypes');
const initCommands = (commands)=>{
    commands?.create({
        name: 'ping',
        description: 'Replies with pong',
    })
    commands?.create({
        name: 'user',
        description: 'Get Basic User Info',
        options: [
            {
                name: 'username',
                description: 'Username of the user',
                type: String,
                required: true,
            },
        ],

    })
}
module.exports = initCommands;