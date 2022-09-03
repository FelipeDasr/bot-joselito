import { Client, Message } from '@open-wa/wa-automate';

export class BotHandler {

    constructor() { }

    private messageTreatment(msg: Message) {
        console.log(msg);
    }

    public async start(client: Client) {
        await client.onAnyMessage(
            this.messageTreatment
        );
    }
}