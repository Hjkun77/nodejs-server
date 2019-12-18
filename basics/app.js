// Core Modules
// 1. http: launch a server and send requests
// 2. https: launch a SSL server
// 3. fs: access the file system in native computer
// 4. path: access paths in native computer
// 5. os: access os of native computer

// use function require to import dependencies
// note that `./` will look for a relative-path based file, `/` will look for an absolute-path based file while no slash will look for a global file
const http = require('http');

const routes = require('./routes');


const server3000 = http.createServer((req, res) => {
    console.log(req)
    // to closes the program use:
    // process.exit()

    //will be sending a respond based html
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>First NodeJS Server</title></head>');
    res.write('<body><h1>Hello from my first ever NodeJS Server</h1></body>')
    res.write('<html/>');
    res.end();
});

server3000.listen(3000);

const server8000 = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    res.setHeader('Content-Type', 'text/html');
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>')
        res.write('<html/>');
        return res.end();
    } else if (url === '/message' && method === 'POST') {
        const body = [];
        // on() => listen to events
        req.on('data', e => {
            body.push(e);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            // writeFileSynce is asynchronous
            // fs.writeFileSync('message.txt', message);
            // third argument is for function when we are done writing the file
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })

    } else {
        res.write('<html>');
        res.write('<head><title>Thank you</title></head>');
        res.write('<body><h1>Thank you very much for your respond</h1></body>')
        res.write('<html/>');
        return res.end();
    }
});

server8000.listen(8000);

const server8080 = http.createServer(routes);

server8080.listen(8080);