import { create } from '@open-wa/wa-automate';
import { BotHandler } from './bot-handler';

const botHandler = new BotHandler();

create({})
    .then(client => botHandler.start(client))
    .catch(err => {
        console.log('Error when trying to start bot', err);
    });