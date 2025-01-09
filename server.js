import http from 'http';
import fs from 'fs/promises';


const server = http.createServer((req, res) => {
    if(req.url === '/'){
        renderHtmlOrCss('./views/home/index.html', 'text/html');
    } else if(req.url === '/cats/add-breed'){
        renderHtmlOrCss('./views/addBreed.html', 'text/html');
    } else if(req.url === '/cats/add-cat'){
        if(req.method === 'GET'){
            renderHtmlOrCss('./views/addCat.html', 'text/html');
        } else if(req.method === 'POST'){
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                console.log(body);
                const data = new URLSearchParams(body);
                console.log(data);
                res.end();
            });
            return;
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
