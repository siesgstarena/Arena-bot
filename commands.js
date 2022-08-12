const { String } = require("./helper/datatypes");

const initCommands = (commands) => {
  commands?.create({
    name: "ping",
    description: "Replies with pong",
  });
  commands?.create({
    name: "user",
    description: "Get Basic User Info",
    options: [
      {
        name: "username",
        description: "Username of the user",
        type: String,
        required: true,
      },
    ],
  });
  commands?.create({
    name: "contest",
    description: "Get Live and Upcoming Contests",
  });
  commands?.create({
    name: "cspresent",
    description: "Get Live Contest info of Codechef",
  });
  commands?.create({
    name: "csupcoming",
    description: "Get Future Contest info of Codechef",
  });
};
module.exports = initCommands;