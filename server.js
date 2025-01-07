import http from 'http';
import siteCss from './content/styles/site.css.js';
import homePage from './views/home/index.html.js';
import addCatBreedPage from './views/addBreed.html.js';
import addCatPage from './views/addCat.html.js';
import editCatPage from './views/editCat.html.js';

const server = http.createServer((req, res) => {
    
    if(req.url === '/'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(homePage);
        return res.end();
    } else if(req.url === '/cats/add-breed'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(addCatBreedPage);
        return res.end();
    } else if(req.url === '/cats/add-cat'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(addCatPage);
        return res.end();
    }  else if(req.url === '/cats-edit'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(editCatPage);
        return res.end();
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
