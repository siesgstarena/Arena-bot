# Dicord-bot
prerequisite: 

  1) Make sure to create the bot on the discord developer portal https://discord.com/developers/docs/intro
  
  2) CodeChef
- To Get The Api of CodeChef You Need To Mail Them At api@codechef.com and Convey for what purpose you need there api
- Then They Will Send One Form You Need To Fill That Form And Wait. Then You Will Get Mail From There Side And Now You Will Be Able To Get The API Token 
- Documentation https://developers.codechef.com/#grant-types
<h4> Get Started</h4>

``` 
    npm install --global yarn
    yarn install 
```
Getting the configuration ready

*Copy the .env.example file at the same location and save as .env*
```
cp .env.example .env
```
<h4> How To Run </h4>

```
    yarn run dev
```

<h4>Starting the application</h4>

```
  docker compose -f .\docker-compose-dev.yml up
```
<h4>Remove cache and build</h4>

```
  docker compose -f .\docker-compose-dev.yml up --build --remove-orphans --force-recreate
```
Discord.js Docs : https://discord.js.org/#/docs/discord.js/main/general/welcome
<br>
Dicord Embed : https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor
<br>
Arena Api Docs : http://arena.siesgst.ac.in/api/docs
<br>
YouTube Playlist : https://www.youtube.com/playlist?list=PLaxxQQak6D_f4Z5DtQo0b1McgjLVHmE8Q

<h1>Commands</h1>
<h1>Primary</h1>

- [x] Basic User Info
- [x] Get Event info about official codechef (Upcoming Contest)
- [x] Help Command
- [x] Create A Poll
- [x] Upcoming Contest
- [x] Assigning a role (make sure that the one who running the command have privilege to give the particular role)
- [x] Top 5 Coders For a given contest

<h3>Secondary</h3>

- [ ] After each contest show user ratings if upgrade show in green if degrade show in red
- [x] All Time Top 5 Coders
