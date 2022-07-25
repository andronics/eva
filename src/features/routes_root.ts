import { Botkit } from 'botkit'

module.exports = function(controller: Botkit) {
    
    controller.webserver.get('/', (req, res) => {

        res.send(`This app is running Botkit ${ controller.version }.`);
    
    });

}


