const { showContest } = require("../services/contest");
const fetchTopUsers = require("../services/topuser");
const fetchUser = require("../services/user");
const errorEmbed = require("./utils");
const {getPresentContests} = require("../services/cspresent");
const { getFutureContests } = require("../services/csupcoming");
const fetchTopCoders = require("../services/topCodersContest");   

describe('User Command', () => {
  it('Replies with user message embed', async () => {
    const user = await fetchUser('salman01');
    expect(user).not.toEqual(errorEmbed);
  })
  it('Replies with error message embed', async () => {
    const user = await fetchUser('sajdhkasd83268@#3');
    expect(user).toEqual(errorEmbed);
  })
})

describe('Contest Command', () => {
  it('Replies with showContest message embed', async () => {
    const contest = await showContest();
    expect(contest).not.toEqual(errorEmbed);
  })
})

describe('TopUser Command', () => {
  it('Replies with topUser message embed', async () => {
    const topUser = await fetchTopUsers(10);
    expect(topUser).not.toEqual(errorEmbed);
  })
})

describe('CodeChef Present',()=>{
  it('Replies with CodeChef Present message embed',async()=>{
    const codechef = await getPresentContests();
    expect(codechef).not.toEqual(errorEmbed);
  })
})

describe('CodeChef Upcoming',()=>{
  it('Replies with CodeChef Upcoming message embed',async()=>{
    const codechef = await getFutureContests();
    expect(codechef).not.toEqual(errorEmbed);
  })
})

describe('Top user',()=>{
  it('Replies with top user message embed',async()=>{
    const topUser = await fetchTopUsers(10);
    expect(topUser).not.toEqual(errorEmbed);
  })
})

describe('Top user of a contest',()=>{
  it('Replies with top user of a contest message embed',async()=>{
    const topUser = await fetchTopCoders('B4E22Q',10);
    expect(topUser).not.toEqual(errorEmbed);
  })
  it('Replies with error message embed',async()=>{
    const topUser = await fetchTopCoders('NOTING',10);
    expect(topUser).toEqual(errorEmbed);
  })
})