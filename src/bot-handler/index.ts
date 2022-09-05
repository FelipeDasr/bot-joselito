import { Client, Message } from '@open-wa/wa-automate';

import { createImageWithSubtitle } from '../functions/createImageWithSubtitle';
import { makeSticker } from '../functions/makeSticker';
import { help } from '../functions/help';

import { Queue } from '../utils/queue';

export class BotHandler {

    constructor(
        private client: Client,
        private queue = new Queue()
    ) { }

    private async messageTreatment(msg: Message) {
        if (!msg.isGroupMsg) return;
        const command = msg.text.split(' ')[0]

        switch (command) {
            case '>ajuda':
                return await help(msg, this.client);

            case '>figurinha':
                return await makeSticker(msg, this.client);

            case '>legenda':
                return this.queue.push(() => {
                    return createImageWithSubtitle(msg, this.client);
                });

            default:
                return;
        }
    }

    public async start() {
        await this.client.onAnyMessage(async msg => {
            await this.messageTreatment(msg);
        });
    }
}