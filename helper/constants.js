module.exports = {
    ARENA_LOGO: "https://res.cloudinary.com/siesgstarena/image/upload/f_auto,q_auto/c_scale,h_64,w_60/v1599156841/arena/assets/arena.png",
    ARENA_DEFAULT_PROFILE_LOGO: "https://res.cloudinary.com/siesgstarena/image/upload/f_auto,q_auto/v1546283328/arena/assets_webp/gravatar.webp",
    ARENA_USER_PROFILE: (userId) => {
        return `http://arena.siesgst.ac.in/profile/${userId}`
    },
    GITHUB_PROFILE_IMAGE:(githubUsername)=>{
        return `https://www.github.com/${githubUsername}.png?size=500`
    },
    ARENA_HEADER : {
        "Accept": "application/vnd.arena+json;version=1",
    }
}