import { Client, Message, decryptMedia } from '@open-wa/wa-automate';
import { help } from '../functions/help';
import { makeSticker } from '../functions/makeSticker';

export class BotHandler {

    constructor() { }

    private async messageTreatment(msg: Message, client: Client) {
        if (!msg.isGroupMsg) return;

        switch (msg.text) {
            case '>ajuda':
                return await help(msg, client);

            case '>figurinha':
                return await makeSticker(msg, client);

            default:
                return;
        }
    }

    public async start(client: Client) {
        await client.onAnyMessage(async msg => {
            await this.messageTreatment(msg, client);
        });
    }
}