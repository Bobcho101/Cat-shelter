import http from 'http';
import fs from 'fs/promises';
import formidable from 'formidable';
import path from 'path';

import renderHomePage from './views/home/index.html.js';
import renderAddCat from './views/addCat.html.js';
import renderEditCat from './views/editCat.html.js';

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        fs.readFile('./data/cats.json', {encoding: 'utf8'})
            .then(data => {
                res.write(renderHomePage(JSON.parse(data)));
                return res.end();
            })
            .catch(err => {
                console.log(err.message);
                return res.end();
            })
       
    } else if(req.url === '/cats/add-breed'){
        if(req.method === 'GET'){
            renderHtmlOrCss('./views/addBreed.html', 'text/html');
        } else if(req.method === 'POST'){
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            
            
            req.on('end', () => {
                const newBreed = body.split('=')[1];
                fs.readFile('./data/breeds.json', {encoding: 'utf-8'})
                    .then(data => {
                        const breeds = JSON.parse(data);
                        if(breeds.includes(newBreed)){
                            res.writeHead(403, {'Content-Type': 'text/html'});
                            res.write(`<!DOCTYPE html>
                                    <html lang="en">
                                    <head>
                                        <meta charset="UTF-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <title>Document</title>
                                    </head>
                                    <body>
                                        <h1>This breed already exists!</h1>
                                        <a href="/"><button>Go back to home page</button></a>
                                    </body>
                                    </html>`);
                            return res.end();
                        }
                        breeds.push(newBreed);
                         
                        return fs.writeFile('./data/breeds.json', JSON.stringify(breeds));
                    })
                    .then(() => {
                        res.writeHead(302, { Location: '/' });
                        return res.end();
                    })
                    .catch(err => {
                        console.log(err.message);
                        return res.end();
                    })
            })
        }
        
    } else if(req.url === '/cats/add-cat'){
        if(req.method === 'GET'){
            res.writeHead(200, {'content-type': 'text/html'});
            res.write(renderAddCat());
            return res.end();
        } else if(req.method === 'POST'){
            const form = formidable({
                multiples: false,
                uploadDir: './data/uploads',
                keepExtensions: true
            });
            form.parse(req, (err, fields, files) => {
                const newFileName = files['upload'][0].newFilename;
                const name = fields['name'][0];
                const description = fields['description'][0];
                const breed = fields['breed'][0];

                fs.readFile(`./data/uploads/${newFileName}`)
                    .then((image) => {
                        const imageBase64 = image.toString('base64');
                        return fs.readFile('./data/cats.json', { encoding: 'utf8' })
                            .then((catsData) => {
                                const cats = JSON.parse(catsData);
                                const imagePath = newFileName;
                                const uid = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
                                const newCatData = {
                                    uid,
                                    name,
                                    description,
                                    breed,
                                    image: imagePath,
                                };

                                cats.push(newCatData);
                                return fs.writeFile('./data/cats.json', JSON.stringify(cats, null, 4));
                            });
                    })
                    .then(() => {
                        res.writeHead(302, { Location: '/' });
                        res.end();
                    })
                    .catch((err) => {
                        console.error('Error handling files:', err);
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error saving data');
                    });        
            });
        }
    } else if(req.url.startsWith('/cats-edit/')){
        res.writeHead(200, {'content-type': 'text/html'});
        res.write(renderEditCat());
        const currentCatUid = req.url.split('/cats-edit/')[1];
        
        fs.readFile('./data/cats.json', { encoding: 'utf8' })
            .then(data => {
                const cats = JSON.parse(data);
                const cat = cats.find(c => c.currentCatUid === currentCatUid);
                console.log(cat);
                
                return res.end(); 
            })
            .catch(err => {
                console.error('Error reading cats data:', err);
                return res.end(); 
            });
        }

    } 

    if(req.url === '/content/styles/site.css'){
        renderHtmlOrCss('./content/styles/site.css', 'text/css');
    }

    function renderHtmlOrCss(path, mimeType){
        res.writeHead(200, {'Content-Type': mimeType});
        fs.readFile(path, {encoding: 'utf-8'})
            .then((data) => {
                res.write(data);
                return res.end();
            }).catch((error) => {
                console.error('Error reading file:', error); 
            });
    }
});

const port = 4000;
server.listen(port, () => {
    console.log(`Server is listening to: http://localhost:${port}`);
})
