import { Botkit } from 'botkit'

export default (controller: Botkit) => {

    if (process.env.DEBUG) {

        controller.hears('echo','message,direct_message', async(bot, message) => {
            await bot.reply(message, 'Did you hear that? ');
        });

        controller.on('message,direct_message', async(bot, message) => {
            await bot.reply(message, `Echo: ${ message.text }`);
        });

    }

}
