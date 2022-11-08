const { String, ROLE, USER ,Integer, Number} = require("./helper/datatypes");

const initCommands = (commands) => {
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
  commands?.create({
    name: "roles",
    description: "A role can be added to a user",
    options: [
      {
        name: "role",
        description: "give the role name",
        type: ROLE,
        required: true,
      },
      {
        name: "user",
        description: "give the user name",
        type: USER,
        required: true,
      },
    ],
  });
  commands?.create({
    name: "rmrole",
    description: "remove a role from a user",
    options: [
      {
        name: "role",
        description: "give the role name",
        type: ROLE,
        required: true,
      },
      {
        name: "user",
        description: "give the user name",
        type: USER,
        required: true,
      },
    ],
  });
  commands?.create({
    name: "poll",
    description: "Create a poll",
    options: [
      {
        name: "title",
        description: "Title of the poll",
        type: String,
        required: true,
      },
      {
        name: "options",
        description: "Options of the poll",
        type: String,
        required: true,
      },
    ],
  });
  commands?.create({
    name:'topusercontest',
    description:'Get top users of a particular contest Default limit is 5',
    options:[
      {
        name:'contest',
        description:'Code of the contest',
        type:String,
        required:true,
      },
      {
        name:'limit',
        description:'Number of users to be displayed',
        type:Number,
      },
    ],
  });
  commands?.create({
    name:'topuser',
    description:'Get top users of all time Default limit is 5',
    options:[
      {
        name:'limit',
        description:'Number of users to be displayed',
        type:Number,
      },
    ],
  });
  commands?.create({
    name:'help',
    description:'Get help',
  });
};
module.exports = initCommands;