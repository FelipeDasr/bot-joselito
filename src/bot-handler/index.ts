import { Client, Message } from '@open-wa/wa-automate';

import { createImageWithText } from '../functions/createImageWithText';
import { makeSticker } from '../functions/makeSticker';
import { help } from '../functions/help';

export class BotHandler {

    constructor(
        private client: Client
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
                return await createImageWithText(msg, this.client);

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