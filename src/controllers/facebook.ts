import { FacebookAdapter, FacebookAdapterOptions, FacebookEventTypeMiddleware } from 'botbuilder-adapter-facebook'
import { Botkit, BotkitConfiguration } from 'botkit'
import { storage } from '../storage'
import { webserver } from '../webserver'

const adapterOptions: FacebookAdapterOptions = {
    
    // debug
    enable_incomplete: process.env.FACEBOOK_ENABLE_INCOMPLETE ? true : false,

    // tokens
    access_token: process.env.FACEBOOK_ACCESS_TOKEN,  
    app_secret: process.env.FACEBOOK_APP_SECRET,  
    verify_token: process.env.FACEBOOK_VERIFY_TOKEN

}

export const facebookAdapter : FacebookAdapter = new FacebookAdapter( adapterOptions )

/* class messages may include:
   facebook_postback, facebook_referral, facebook_optin, facebook_account_linking,
   facebook_receive_thread_control, facebook_request_thread_control, facebook_app_roles
   message_delivered, message_echo, message_read or standby
*/

facebookAdapter.use( new FacebookEventTypeMiddleware() )

const controllerOptions: BotkitConfiguration = {
    adapter: facebookAdapter,
    storage: storage,
    webhook_uri: '/api/facebook/events',
    webserver: webserver
}

export const facebookController: Botkit = new Botkit(controllerOptions)