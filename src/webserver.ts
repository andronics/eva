import express, { Request, Response, NextFunction } from 'express'
import { json, urlencoded } from 'body-parser'

// todo: migrate to body-parser:raw
const rawBody = function (req: Request, res: Response, next: NextFunction ) {
    req.rawBody = ''
    req.on('data', chunk => {
        req.rawBody += chunk
    })
    next()
}

export const webserver = express()
webserver.use( rawBody )
webserver.use( json() )
webserver.use( urlencoded( { extended: true }) )
