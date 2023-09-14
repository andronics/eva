import { HangoutsAdapter, HangoutsAdapterOptions } from 'botbuilder-adapter-hangouts'
import { Botkit, BotkitConfiguration } from 'botkit'
import { storage } from '../storage'
import { webserver } from '../webserver'

const adapterOptions: HangoutsAdapterOptions = {
    
    // debug
    enable_incomplete: process.env.HANGOUTS_ENABLE_INCOMPLETE ? true : false,

    // tokens
    token: process.env.HANGOUTS_TOKEN,  
    google_auth_params: {
        client_email: process.env.HANGOUTS_CLIENT_EMAIL,
        private_key: process.env.HANGOUTS_PRIVAYE_KEY
    }

}

export const hangoutsAdapter : HangoutsAdapter = new HangoutsAdapter( adapterOptions )

const controllerOptions: BotkitConfiguration = {
    adapter: hangoutsAdapter,
    storage: storage,
    webhook_uri: '/api/hangouts/events',
    webserver: webserver
}

export const hangoutsController: Botkit = new Botkit(controllerOptions)