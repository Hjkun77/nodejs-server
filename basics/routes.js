const fs = require('fs');

const requestHandler = (req, res) => {
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
}


// Two ways to export functions/modules
module.exports = requestHandler;
// exports.handler = requestHandler;