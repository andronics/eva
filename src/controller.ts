import { Botkit } from 'botkit'
import { BotkitCMSHelper } from 'botkit-plugin-cms'
import { storage } from './storage'
import { webserver } from './webserver'

export const controllerFactory = ({ adapter, webhook_uri }) => {
    
    const controller = new Botkit({
        adapter, storage, webserver, webhook_uri
    })
    
    controller.loadModules(__dirname + "/features")

    if (process.env.CMS_URI) {
        controller.usePlugin(
            new BotkitCMSHelper({
                uri: process.env.CMS_URI,
                token: process.env.CMS_TOKEN
            })
        )
    }

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
    
    return controller

}