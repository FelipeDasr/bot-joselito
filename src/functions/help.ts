import { Client, Message } from '@open-wa/wa-automate';

export const help = async (msg: Message, client: Client) => {
    const { id: msgId, chatId } = msg;

    return await client.reply(
        chatId,
        "*♠️ BOT JOSELITO 2.0*\n\n" +
        "*>ajuda*. Exibir instruções de ajuda.\n\n" +
        "*>figurinha*. Deve ser enviado com uma imagem ou um gif.\n\n" +
        "*>legenda*. Deve ser enviado com uma imagem e com uma legenda para ser colocada na foto\n\n"+
        "*Horário de funcionamento: 8:10 - 16:30 (Seg - Sex)*\n\n" +
        "By: *Felipe Dos Anjos*",
        msgId
    );
}