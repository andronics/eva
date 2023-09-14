import { WebAdapter } from 'botbuilder-adapter-web'
import { Botkit, BotkitConfiguration } from 'botkit'
import { storage } from '../storage'

export const webAdapter : WebAdapter = new WebAdapter()

const controllerOptions: BotkitConfiguration = {
    adapter: webAdapter,
    storage: storage,
    webhook_uri: '/api/web/events'
}

export const webController: Botkit = new Botkit(controllerOptions)