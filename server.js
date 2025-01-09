import http from 'http';
import fs from 'fs/promises';
import formidable from 'formidable';
import path from 'path';

import renderHomePage from './views/home/index.html.js';
import renderCatsBoxTemplate from './views/home/catsBox.html.js';

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
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
        renderHtmlOrCss('./views/addBreed.html', 'text/html');
    } else if(req.url === '/cats/add-cat'){
        if(req.method === 'GET'){
            renderHtmlOrCss('./views/addCat.html', 'text/html');
        } else if(req.method === 'POST'){
            const form = formidable({
                multiples: false,
                uploadDir: './data/uploads',
                keepExtensions: true
            });
            form.parse(req, (err, fields, files) => {
                // const path = fs.copyFile(files['upload'].filepath);
                // console.log(path);
                // console.log(files['upload'][0]);
                // fs.copyFile(files['upload'].filepath, )  
                   
                const newFileName = files['upload'][0].newFilename;
                console.log(newFileName);
                const name = Object.entries(fields)[0][1][0];
                const description = Object.entries(fields)[1][1][0];
                const breed = Object.entries(fields)[2][1][0];
                
                fs.readFile(`./data/uploads/${newFileName}`, {encoding: 'utf8'})
                    .then(photo => {
                        
                        return res.end();
                    })
                    .catch((err) => {
                        console.log(err.message);
                        return res.end();
                    })
            });

            // let body = '';
            // req.on('data', chunk => {
            //     body += chunk.toString();
            // });
            // req.on('end', () => {
            //     const data = new URLSearchParams(body);
            //     const newCat = Object.fromEntries(data);
            //     const image = newCat.image;

            //     console.log(image);

            //     const uid = `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
            //     const newCatData = {
            //         uid,
            //         name: newCat.name,
            //         description: newCat.description,
            //         image:  newCat.upload,
            //         breed: newCat.breed
            //     };

            //     fs.readFile('./data/cats.json', { encoding: 'utf8'})
            //         .then((catsData) => {
            //             const cats = JSON.parse(catsData);
            //             cats.push(newCatData);
            //             console.log(cats);
            //             fs.writeFile('./data/cats.json', JSON.stringify(cats, null, 4))
            //             return res.end();
            //         })
            //         .catch(err => {
            //             console.log(err.message)
            //             return res.end();
            //         });
            // });
            // return;
        }
    } else if(req.url === '/cats-edit'){
        renderHtmlOrCss('./views/editCat.html', 'text/html');
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
