import { SlackAdapter, SlackMessageTypeMiddleware, SlackEventMiddleware } from 'botbuilder-adapter-slack'

import { getTokenForTeam } from '../utils/getTokenForTeam'
import { getBotUserByTeam } from '../utils/getBotUserByTeam'

export const adapter = new SlackAdapter({
    
    // debug
    enable_incomplete: process.env.SLACK_ENABLE_INCOMPLETE ? true : false,

    // single-team token
    botToken: process.env.SLACK_BOT_TOKEN,

    // multi-team credentials
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    redirectUri: process.env.SLACK_REDIRECT_URI,
    scopes: ['bot'],

    // team-specific info
    getTokenForTeam,
    getBotUserByTeam,

    // webhook endpoint
    clientSigningSecret: process.env.SLACK_CLIENT_SIGNING_SECRET,  
    verificationToken: process.env.SLACK_VERIFICATION_TOKEN

})

// emit events that match their original Slack event types
adapter.use( new SlackEventMiddleware() )

// further classify messages as direct_message, direct_mention, or mention
adapter.use(new SlackMessageTypeMiddleware())