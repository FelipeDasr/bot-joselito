import { Client, Message, decryptMedia} from '@open-wa/wa-automate';

export const makeSticker = async (msg: Message, client: Client) => {
    const { isMedia, type, id: msgId, chatId } = msg;

    const requirements = [
        isMedia === true,
        type === 'image' || type === 'video',
    ]

    if (requirements.includes(false)) {
        return await client.reply(
            chatId, "Sem foto/gif, sem figurinha parceiro.", msgId
        );
    }

    const mediaData = await decryptMedia(msg);
    const stickerMetadata = {
        author: 'By Felipe Dos Anjos',
        pack: '👺 BOT JOSELITO'
    };

    switch (type) {
        case 'image':
            return await client.sendImageAsStickerAsReply(
                chatId, mediaData, msgId, stickerMetadata
            );

        case 'video':
            return await client.sendMp4AsSticker(
                chatId, mediaData, msgId, stickerMetadata
            );
    }
}