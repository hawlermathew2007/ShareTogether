import facebookLogo from './../../images/facebook.png'
import instagramLogo from './../../images/instagram.png'
import redditLogo from './../../images/reddit.png'
import discordLogo from './../../images/discord.png'
import githubLogo from './../../images/github.png'

// need dictionary (map)

const informationNav = [
    {
        headline: 'About me',
        partials: ['Identity', 'Desire', 'Programming Language and Skill', 'Education', 'Contact']
    },
    {
        headline: 'About ShareTogether',
        partials: ['Homepage', 'Privacy Service','Rules', 'Website Purpose']
    },
    {
        headline: 'Feedback Reason',
        partials: null
    },
]

const socialMediaLogo = {
    facebook: facebookLogo,
    instagram: instagramLogo,
    reddit: redditLogo,
    discord: discordLogo,
    github: githubLogo,
}

export { informationNav, socialMediaLogo }