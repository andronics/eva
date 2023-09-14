import debugFactory from '../utils/debug'
const debug = debugFactory("auth")

import { Botkit } from 'botkit'
import { Request, Response } from 'express'

export default (controller: Botkit) => {

    const handler = {
        
        login: (req: Request, res: Response) => {
            debug("handling login request")
            res.redirect(controller.adapter.getInstallLink())
        }
    
    }

    return handler

}