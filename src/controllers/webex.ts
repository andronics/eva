import { WebexAdapter, WebexAdapterOptions } from 'botbuilder-adapter-webex'
import { Botkit, BotkitConfiguration } from 'botkit'
import { storage } from '../storage'

const adapterOptions: WebexAdapterOptions = {
    
    // debug
    enable_incomplete: process.env.WEBEX_ENABLE_INCOMPLETE ? true : false,

    // tokens
    access_token: process.env.WEBEX_ACCESS_TOKEN,
    public_address: process.env.WEBEX_PUBLIC_ADDRESS,
    secret: process.env.WEBEX_SECRET 

}

export const webexAdapter : WebexAdapter = new WebexAdapter( adapterOptions )

const controllerOptions: BotkitConfiguration = {
    adapter: webexAdapter,
    storage: storage,
    webhook_uri: '/api/webex/events'
}

export const webexController: Botkit = new Botkit(controllerOptions)