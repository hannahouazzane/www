const http = require('http')
const fs = require('fs')
const data = require('./data.json')

const server = http.createServer(function (req, res){
    console.log('Recieved request', req.url)
    if (req.url === '/') {
        const html = fs.readFileSync('./index.html')
        let posts = data.map(post => `<article><h1><a href="/posts/${post.id}>${post.title}</a></h1><article>`).join('')
        const page = html.toString().replace('REPLACE_ME', posts)
        res.writeHead(200);
        res.write(page)
    } else if (req.url.startsWith('/posts/')) {
        const html = fs.readFileSync('./index.html')
        let postId = req.url.split('/').pop()
        let post = data.find(item => item.id === postId)
        if (post) {
            let output = `<article><h1>${post.title}</h1><p>${post.content}</p></article>`
            const page = html.toString().replace('REPLACE_ME', output)
            res.writeHead(200);
            res.write(page)
        } else {
            res.writeHead(404);
        }
    } else {
        res.writeHead(404);
    }
    res.end()
})

server.listen(3500, () => {
    console.log('running on p:3500')
})
