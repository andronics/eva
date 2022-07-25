import { BotkitCMSHelper } from 'botkit-plugin-cms'

export let plugin = null

if (process.env.CMS_URI) {
    plugin = new BotkitCMSHelper({
        uri: process.env.CMS_URI,
        token: process.env.CMS_TOKEN
    })
}

export const ready = (controller) => {

    //  catch-all that uses the CMS to trigger dialogs

    if (controller.plugins.cms) {
        
        // controller.on('message,direct_message', async (bot, message) => {
        
        //     let results = false
        //     results = await controller.plugins.cms.testTrigger(bot, message)

        //     if (results !== false) {
        //         // do not continue middleware!
        //         return false;
        //     }
        
        // })
    
    }

}
