import http from 'http';
import fs from 'fs/promises';
import siteCss from './content/styles/site.css.js';


const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('./views/home/index.html', {encoding: 'utf-8'})
            .then((data) => {
                res.write(data);
                return res.end();
            }).catch((error) => {
                console.error('Error reading file:', error); 
            });
    } else if(req.url === '/cats/add-breed'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('./views/addBreed.html', {encoding: 'utf-8'})
        .then((data) => {
            res.write(data);
            return res.end();
        }).catch((error) => {
            console.error('Error reading file:', error); 
        });
    } else if(req.url === '/cats/add-cat'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('./views/addCat.html', {encoding: 'utf-8'})
        .then((data) => {
            res.write(data);
            return res.end();
        }).catch((error) => {
            console.error('Error reading file:', error); 
        });
    } else if(req.url === '/cats-edit'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('./views/editCat.html', {encoding: 'utf-8'})
        .then((data) => {
            res.write(data);
            return res.end();
        }).catch((error) => {
            console.error('Error reading file:', error); 
        });
    }


    if(req.url === '/content/styles/site.css'){
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(siteCss);
        return res.end();
    }
});

const port = 4000;
server.listen(port, () => {
    console.log(`Server is listening to: http://localhost:${port}`);
})
