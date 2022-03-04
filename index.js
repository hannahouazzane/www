const http = require('http')
const fs = require('fs')
const data = require('./data.json')

const server = http.createServer(function (req, res){
    console.log('Recieved request', req.url)
    if (req.url === '/') {
        const html = fs.readFileSync('./index.html')
        const page = html.toString().replace('REPLACE_ME', data.length)
        res.writeHead(200);
        res.write(page)
    } else {
        res.writeHead(404);
    }
    res.end()
})

server.listen(3500, () => {
    console.log('running on p:3500')
})