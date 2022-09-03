import { create } from '@open-wa/wa-automate';
import { BotHandler } from './bot-handler';

create({})
    .then(async client => {
        const botHandler = new BotHandler(client);
        await botHandler.start();
    })
    .catch(err => {
        console.log('Error when trying to start bot', err);
    });