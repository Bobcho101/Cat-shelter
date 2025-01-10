import fs, { readFileSync } from 'fs';

export default (cat) => {
    const imagePath = `${process.cwd()}/data/uploads/${cat.image}`;

    const imageBuffer = readFileSync(imagePath)

    const imageBase64 = `data:image/png;base64,${imageBuffer.toString('base64')}`;
    
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${cat.name}</title>
    </head>
    <body>
        <li>
            <img src="${imageBase64}" alt="">
            <h3>${cat.name}</h3>
            <p><span>Breed: </span>${cat.breed}</p>
            <p><span>Description: </span>${cat.description}</p>
            <ul class="buttons">
                <li class="btn edit"><a href="/cats-edit/${cat.uid}">Change Info</a></li>
                <li class="btn delete"><a href="/details/${cat.uid}">New Home</a></li>
            </ul>
        </li>
    </body>
    </html>`;
};
