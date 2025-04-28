import http from "http";
import url from "url";
import fs from "fs";
import querystring from "querystring";
import { serveFile } from "./file-serve.js";

const server = http.createServer((req,res)=>{ 
    const myURL = url.parse(req.url, true)

    const validUsername = 'admin';
    const validPassword = '1234';

    if (req.url === "/favicon.ico") {
        return
    }

    const data = `${Date.now()}: ${req.url} new data rec. \n`

    fs.appendFile("sample.txt", data, (err,data)=>{
        if (myURL.pathname === "/about") {
            res.end(`hi, ${myURL.query.myname} userid ${myURL.query.id}`)
        }
        
        else if (req.url === "/") {
            // fs.readFile("./public/index.html", (err,data)=>{
            //     if (err) {
            //         res.end("error loading homepage")
            //     }
            //     else{
            //         // res.writeHead(200, {'content-type' : 'text/html'})
            //         res.end(data)
            //     }
            // })

            serveFile("index.html",res)
        }
    
        else if (req.url === "/login" && req.method === 'GET') {
            serveFile("login.html",res)
        }

        else if(req.url === "/login" && req.method === "POST"){
            let body = '';
            req.on('data', chunk => {
                console.log(chunk)
                body += chunk.toString();
                console.log("body",body)

            });

            req.on('end', () => {
                const parsedData = querystring.parse(body);
                console.log(parsedData)

                if (parsedData.user === validUsername && parsedData.pwd === validPassword) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(`<h2>Welcome, ${parsedData.user}!</h2><a href="/">Back to Home</a>`);
                    
                  } else {
                    res.writeHead(401, { 'Content-Type': 'text/html' });
                    res.end('<h2>Invalid credentials. <a href="/login">Try again</a></h2>');
                    console.log(res.statusCode)
                  }
            })
        }
    
        else{
            serveFile("404.html",res)
        }
    })
})

server.listen(3000,(err)=>{
    if (err) {
        console.log("server crash", err)
    }
    else{
        console.log("Running at the port")
    }
})