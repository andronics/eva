// load environment variables from .env
import { config } from 'dotenv'
config()

// import { BotkitCMSHelper, CMSOptions } from 'botkit-plugin-cms'
import { readdirSync } from 'fs'
import { join } from 'path' 
import { slackController } from './controllers'
import { webserver } from './webserver'

const controllers = [ slackController ]

const routesFiles = readdirSync(join(__dirname, 'routes'))
const skillFiles = readdirSync(join(__dirname, 'skills'))

controllers.forEach(controller => {

    routesFiles.forEach(routeFile => {
        import("./routes/" + routeFile).then(route => route.default(controller) )
    })
    
    skillFiles.forEach(skillFile => {
        import("./skills/" + skillFile).then(skill => skill.default(controller) )
    })

    // if (process.env.CMS_URI) {
    //     const cmsOptions: CMSOptions = {
    //         uri: process.env.CMS_URI,
    //         token: process.env.CMS_TOKEN
    //     }
    //     controller.usePlugin( new BotkitCMSHelper(cmsOptions) )
    // }
    
    controller.ready(() => {
        if (controller.plugins.cms) {
            controller.on('message,direct_message', async (bot, message) => {
                let results = false
                results = await controller.plugins.cms.testTrigger(bot, message)
                if (results !== false) {
                    // do not continue middleware!
                    return false;
                }
                return results
            })
        }
    })

})

// local development server
if (require.main === module) {
    import('http').then(http => {
        const port = process.env.PORT || 3000
        const srv = http.createServer(webserver)
        srv.listen(port, () => {
            console.log("Webhook Endpoints\n")
        })
    })
}