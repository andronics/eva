import { WhatsAppAdapter, IWhatsAppAdapterOptions } from '@aliyssium/botbuilder-adapter-whatsapp'
import { Botkit, BotkitConfiguration } from 'botkit'
import { storage } from '../storage'

const adapterOptions: IWhatsAppAdapterOptions = {
    
    // debug
    enableIncomplete: process.env.WHATSAPP_ENABLE_INCOMPLETE ? true : false,

    // security - todo: fix authenication method
    // auth: {
    //     creds: process.env.WHATSAPP_AUTH_CREDS
    //     keys: process.env.WHATSAPP_AUTH_KEYS
    // }

}

export const whatsappAdapter : WhatsAppAdapter = new WhatsAppAdapter( adapterOptions )

const controllerOptions: BotkitConfiguration = {
    adapter: whatsappAdapter,
    storage: storage,
    webhook_uri: '/api/whatsapp/events'
}

export const whatsappController: Botkit = new Botkit(controllerOptions)