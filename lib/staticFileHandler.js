//1. Import http module
const http = require('http') 
const path = require('path')
const fs = require('fs')

//2. Create server

const serveStaticFile = (request, response)=>{
//3.1 Parrse Url and detemmine filename
//3.2 If not path has defined - return 'index.html'
const url = request.url === '/' ? 'index.html' : request.url;


const filepath = path.join(__dirname, "../public", request.url)
console.log(`file name is ${filepath}`)

//Default html
let contentType =  'text/html';
switch (path.extname(request.url)) {


    case '.html':
        case '.htm':
            contentType =  'text/html';
            break;
        case '.txt':
            contentType =  'text/plain';
            break;
        case '.css':
            contentType =  'text/css';
            break;
        case '.js':
            contentType =  'text/javascript';
            break;
        case '.json':
            contentType =  'application/json';
            break;
        case '.xml':
            contentType =  'application/xml';
            break;
        case '.png':
            contentType =  'image/png';
            break;
        case '.jpg':
        case '.jpeg':
            contentType =  'image/jpeg';
            break;
        case '.gif':
            contentType =  'image/gif';
            break;
        case '.svg':
            contentType =  'image/svg+xml';
            break;
        case '.pdf':
            contentType =  'application/pdf';
            break;
        case '.doc':
            contentType =  'application/msword';
            break;
        case '.docx':
            contentType =  'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
            break;
        case '.xls':
            contentType =  'application/vnd.ms-excel';
            break;
        case '.xlsx':
            contentType =  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
            break;
        default:
            contentType =  'application/octet-stream'; // Default to octet-stream if extension is unknown
            break;
}

//Read file async
fs.readFile(filepath, (error, content)=>{
    //1. Check for Errors. if error exists, retrun 404.html.
    if(error)
    {
        if(error.code==='ENOENT')
        {
            const errorFile = path.join(__dirname, "../public", '404.html')
            fs.readFile(errorFile , (err, data) =>{
                //Assumption, all is well
                response.writeHead(404, {'Content-Type':'text/html'})
                response.end(data);
            })
        }
        else{
        //DEFAULT error hadling
        response.writeHead(500, {'Content-Type':'text/html'})
            response.end(`Server error: ${error.code}`)
        }
    }
    else{
        response.writeHead(200, {'Content-Type': contentType})
        response.end(content, 'utf8');
    }
});
}


module.exports = {serveStaticFile};