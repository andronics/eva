import { FacebookAdapter, FacebookEventTypeMiddleware } from 'botbuilder-adapter-facebook'

export const adapter = new FacebookAdapter({
    
    // debug
    enable_incomplete: process.env.FACEBOOK_ENABLE_INCOMPLETE ? true : false,

    // tokens
    access_token: process.env.FACEBOOK_ACCESS_TOKEN,  
    app_secret: process.env.FACEBOOK_APP_SECRET,  
    verify_token: process.env.FACEBOOK_VERIFY_TOKEN

})

// emit events that match their original Facebook event types
adapter.use( new FacebookEventTypeMiddleware() )
