import { Botkit } from 'botkit'
import { Request, Response } from 'express'

export default (controller: Botkit) => {
    
    controller.webserver.get('/', (req: Request, res: Response) => {

        res.send(`This app is running Botkit ${ controller.version }.`);
    
    });

}

