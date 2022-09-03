import { Client, Message } from '@open-wa/wa-automate';

import { makeSticker } from '../functions/makeSticker';
import { help } from '../functions/help';

export class BotHandler {

    constructor(
        private client: Client
    ) { }

    private async messageTreatment(msg: Message) {
        if (!msg.isGroupMsg) return;

        switch (msg.text) {
            case '>ajuda':
                return await help(msg, this.client);

            case '>figurinha':
                return await makeSticker(msg, this.client);

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