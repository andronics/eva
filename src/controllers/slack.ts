import { SlackAdapter, SlackMessageTypeMiddleware, SlackEventMiddleware, SlackAdapterOptions } from 'botbuilder-adapter-slack'
import { getTokenForTeam } from '../utils/getTokenForTeam'
import { getBotUserByTeam } from '../utils/getBotUserByTeam'
import { Botkit, BotkitConfiguration } from 'botkit'
import { storage } from '../storage'
import { webserver } from '../webserver'

const adapterOptions: SlackAdapterOptions = {
    
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

}

export const slackAdapter : SlackAdapter = new SlackAdapter( adapterOptions )
slackAdapter.use( new SlackEventMiddleware() ) // emit events match original Slack event types
slackAdapter.use( new SlackMessageTypeMiddleware() ) // classify messages as direct_message, direct_mention, or mention

const controllerOptions: BotkitConfiguration = {
    adapter: slackAdapter,
    storage: storage,
    webhook_uri: '/api/slack/events',
    webserver: webserver
}

export const slackController: Botkit = new Botkit(controllerOptions)