import { Client, Message, decryptMedia } from '@open-wa/wa-automate';
import Jimp from 'jimp';

import path from 'path';
import { createFile, deleteFile, generateId } from '../utils';

export const createImageWithSubtitle = async (msg: Message, client: Client) => {
    const { isMedia, type, id: msgId, chatId, mimetype } = msg;

    // Requirements to run the command
    const requirements = [
        isMedia === true,
        type === 'image'
    ]

    if (requirements.includes(false)) {
        return await client.reply(
            chatId, "Sem foto, sem acordo parceiro.", msgId
        );
    }

    try {
        const imageBaseName = `${generateId()}.${mimetype?.split('/')[1] as string}`;
        const inputImageName = 'i_' + imageBaseName;
        const outputImageName = 'o_' + imageBaseName;

        // Input image temporary path
        const inputImagePath = path.resolve('src', 'temp', inputImageName);
        await createFile(await decryptMedia(msg), inputImagePath);

        const image = await Jimp.read(inputImagePath);
        const font = await Jimp.loadFont(
            image.bitmap.height < 370 ?
                path.join(__dirname, '/../assets/fonts/20/impact.fnt') :
                image.bitmap.height < 800 ?
                    path.join(__dirname, '/../assets/fonts/45/impact.fnt') :
                    path.join(__dirname, '/../assets/fonts/70/impact.fnt')
        );

        const subtitle = msg.text.split('>legenda')[1].trim().toUpperCase();
        const legendHeight = Jimp.measureTextHeight(font, subtitle, image.bitmap.width);

        // Generate the image
        image.print(
            font,
            0,
            image.bitmap.height - legendHeight * 2,
            {
                text: subtitle,
                alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            },
            image.bitmap.width,
            image.bitmap.height
        );

        // Output image temporary path
        const outputImagePath = path.resolve('src', 'temp', outputImageName);
        await createFile(
            await image.getBufferAsync(mimetype as string),
            outputImagePath
        );

        await client.sendImage(
            chatId, outputImagePath, imageBaseName, '', msgId
        );

        deleteFile(outputImagePath);
        deleteFile(inputImagePath);
    }
    catch (e) {
        console.log(e);
        return await client.reply(
            chatId, "Algum erro aconteceu ao tentar processar sua imagem", msgId
        );
    }
}