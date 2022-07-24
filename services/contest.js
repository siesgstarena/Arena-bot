const axios = require("axios");
const dayjs = require("dayjs");
var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
var localizedFormat = require("dayjs/plugin/localizedFormat");
const { MessageEmbed } = require("discord.js");
const { boldMe } = require("../helper/styles");
const {
  ARENA_LOGO,
  ARENA_DEFAULT_PROFILE_LOGO,
  ARENA_USER_PROFILE,
  GITHUB_PROFILE_IMAGE,
  ARENA_HEADER,
  CONTEST_LINK,
} = require("../helper/constants");
const {urlMe} = require("../helper/styles")
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

// Gets all the contests
const getContests=async()=>{
  try {
    const res = await axios.get(
      `http://arena.siesgst.ac.in/api/contests`,{ headers: ARENA_HEADER }
    );
    const contests = res.data;
    return contests
  } catch (err) {
    console.log(err);
  }
}

const showContest=async()=>{
  try {
    const contests= await getContests()

    let dict=[]

    for(let c in contests){
      let start = dayjs(contests[c].startsAt)
      let end = dayjs(contests[c].endsAt)
      const currentDateAndTime = dayjs().tz("Asia/Kolkata");
      if(currentDateAndTime<start){
        let item={}
        item["status"]="Upcoming Contest"
        item["name"]=contests[c].name
        item["type"] = contests[c].type;
        item["code"]=contests[c].code
        item["start"] = `${start.format("llll")} IST`
        item["end"] = `${end.format("llll")} IST`
        dict.push(item)
      }

      else if(currentDateAndTime>=start && currentDateAndTime<=end){
        let item = {};
        item["status"] = "Live Contest";
        item["name"] = contests[c].name;
        item["code"] = contests[c].code;
        item["type"] = contests[c].type;
        item["start"] = `${start.format("llll")} IST`
        item["end"] = `${end.format("llll")} IST`
        dict.push(item);
      }

      else if(currentDateAndTime>end){
        continue
      }
      else{
        console.log("Contest Comming Soon")
      }
    }
    console.log(dict)

    const exampleEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("CONTESTS")
      .setThumbnail(ARENA_LOGO)
      exampleEmbed.addFields({
        name: "LIVE NOW",
        value: "\u200B",
      });
      for (let i in dict) {
        if(dict[i].status==="Live Contest"){
          exampleEmbed.addFields({
            name: `${dict[i].name}`,
            value: `Start: ${dict[i].start}\nEnd: ${dict[i].end}\n${urlMe("See More",CONTEST_LINK(dict[i].code))}`,
            inline: true,
          });
        }
      }
      exampleEmbed.addFields({ name: "\u200B", value: "\u200B" });
      exampleEmbed.addFields({
        name: "UPCOMING CONTEST",
        value: "\u200B",
      });
      let flag=false
      for (let i in dict) {
        if (dict[i].status === "Upcoming Contest") {
          exampleEmbed.addFields({
            name: `${dict[i].name}`,
            value: `Start: ${dict[i].start}\nEnd: ${dict[i].end}\n${urlMe("See More",CONTEST_LINK(dict[i].code))}`,
            inline: true,
          });
          flag=true
        }
      }
      if(flag==false){
        exampleEmbed.addFields({
          name: "Contest Coming Soon",
          value: "\u200B",
        });
      }
      return exampleEmbed
  } 
  catch (err) {
    console.log(err)
    return new MessageEmbed().setTitle("Error");
  }
}


module.exports={getContests, showContest}