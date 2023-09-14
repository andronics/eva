import { FacebookEventTypeMiddleware } from 'botbuilder-adapter-facebook'
import { WorkplaceAdapter, WorkplaceAdapterOptions } from 'botbuilder-adapter-workplace'
import { Botkit, BotkitConfiguration } from 'botkit'
import { storage } from '../storage'

const adapterOptions: WorkplaceAdapterOptions = {
    
    // debug
    enable_incomplete: process.env.FACEBOOK_ENABLE_INCOMPLETE ? true : false,

    // tokens
    access_token: process.env.FACEBOOK_ACCESS_TOKEN,  
    app_secret: process.env.FACEBOOK_APP_SECRET,  
    verify_token: process.env.FACEBOOK_VERIFY_TOKEN

}

export const workplaceAdapter : WorkplaceAdapter = new WorkplaceAdapter( adapterOptions )

/* class messages may include:
   facebook_postback, facebook_referral, facebook_optin, facebook_account_linking,
   facebook_receive_thread_control, facebook_request_thread_control, facebook_app_roles
   message_delivered, message_echo, message_read or standby
*/

workplaceAdapter.use( new FacebookEventTypeMiddleware() )

const controllerOptions: BotkitConfiguration = {
    adapter: workplaceAdapter,
    storage: storage,
    webhook_uri: '/api/workplace/events'
}

export const workplaceController: Botkit = new Botkit(controllerOptions)