import { Client, Message } from '@open-wa/wa-automate';

export const help = async (msg: Message, client: Client) => {
    const { id: msgId, chatId } = msg;

    return await client.reply(
        chatId,
        "*👺 BOT JOSELITO 2.0*\n\n" +
        "*>ajuda*. Exibir instruções de ajuda.\n\n" +
        "*>figurinha*. Deve ser enviado com uma imagem ou um gif.\n\n" +
        "*O bot estará disponível das 8:40 até as 16:30, mas poderá estar indisponível as vezes.*\n\n" +
        "By: *Felipe Dos Anjos*",
        msgId
    );
}