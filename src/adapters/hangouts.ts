import { HangoutsAdapter } from 'botbuilder-adapter-hangouts'

export const adapter = new HangoutsAdapter({
    
    // debug
    enable_incomplete: process.env.HANGOUTS_ENABLE_INCOMPLETE ? true : false,

    // tokens
    token: process.env.HANGOUTS_TOKEN,  
    google_auth_params: {
        client_email: process.env.HANGOUTS_CLIENT_EMAIL,
        private_key: process.env.HANGOUTS_PRIVAYE_KEY
    }

})
