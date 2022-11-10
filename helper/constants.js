module.exports = {
  ARENA_LOGO: "https://res.cloudinary.com/siesgstarena/image/upload/f_auto,q_auto/c_scale,h_64,w_60/v1599156841/arena/assets/arena.png",
  ARENA_DEFAULT_PROFILE_LOGO: "https://res.cloudinary.com/siesgstarena/image/upload/f_auto,q_auto/v1546283328/arena/assets_webp/gravatar.webp",
  ARENA_USER_PROFILE: (userId) => {
    return `http://arena.siesgst.ac.in/profile/${userId}`
  },
  GITHUB_PROFILE_IMAGE: (githubUsername) => {
    return `https://www.github.com/${githubUsername}.png?size=500`
  },
  ARENA_HEADER: {
    "Accept": "application/vnd.arena+json;version=1",
  },
  CONTEST_LINK: (contestCode) => {
    return `http://arena.siesgst.ac.in/contest/${contestCode}`
  },
  CODECHEF_LOGO: 'https://i.pinimg.com/originals/c5/d9/fc/c5d9fc1e18bcf039f464c2ab6cfb3eb6.jpg',
  CODECHEF_CONTEST_LINK: (contestCode) => {
    return `https://www.codechef.com/${contestCode}`
  },
  PREVILAGE_TO_GIVE_ROLES: ['1007879163526516817','803665073373052938','803665297822187572','803668262411829288','890179188852686848']
}
