// load environment variables from .env
import { config } from 'dotenv'
config()

import { webserver } from './webserver'

import './controller'
// import './platforms/teams/controller'

// local development server
if (require.main === module) {
    import('http').then(http => {
        const port = process.env.PORT || 3000
        const srv = http.createServer(webserver)
        srv.listen(port, () => {
            console.log("Webhook Endpoints\n")
            console.log("       Facebook:  http://127.0.0.1:" + port + process.env.FACEBOOK_WEBHOOK_URI)
            console.log("       Hangouts:  http://127.0.0.1:" + port + process.env.HANGOUTS_WEBHOOK_URI)
            console.log("          Slack:  http://127.0.0.1:" + port + process.env.SLACK_WEBHOOK_URI)
            console.log("          Teams:  http://127.0.0.1:" + port + process.env.TEAMS_WEBHOOK_URI)
            console.log("            Web:  http://127.0.0.1:" + port + process.env.WEB_WEBHOOK_URI)
            console.log("          Webex:  http://127.0.0.1:" + port + process.env.WEBEX_WEBHOOK_URI)
            console.log("       WhatsApp:  http://127.0.0.1:" + port + process.env.WHATSAPP_WEBHOOK_URI)
            console.log("      Workplace:  http://127.0.0.1:" + port + process.env.WORKPLACE_WEBHOOK_URI)
        })
    })
}