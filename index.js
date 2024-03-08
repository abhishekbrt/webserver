const http = require("node:http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const { json } = require("stream/consumers");
const { readFileSync } = require("node:fs");

const server = http.createServer();

server.on("request", (req, res) => {
  // console.log(typeof(req));
  // const { method, url, headers } = req;

  // // Log request details
  // console.log(`Method: ${method}`);
  // console.log(`URL: ${url}`);
  // console.log('Headers:', headers);
  // console.log(req.data);

  const parsedUrl = url.parse(req.url, true);
  const queryParameter = parsedUrl.query;
  // console.log("Query parameters:", queryParameter);

  const uri = url.parse(req.url).pathname;
  // console.log("path url:", uri);

  // /chat route
  if (uri === "/chat") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("/home/abhishek/react/webrtc/host.html", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(err);
      } else {
        //   console.log(data);
        res.end(data);
      }
    });
  }

  //  /home route
  if (uri === "/home") {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end(err);
      } else {
        res.end(data);
      }
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("hello world, / route");
  }

  if (uri === "/data") {
    // console.log(req.data);
    // console.log(req.url)
    console.log(req.method);
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
        console.log(body);
      });
      req.on("end", () => {
        const data = JSON.parse(body);
        console.log("Received message from client:", data.message);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Message received");
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  }

  //   console.log('printed before data');
});

const hostname = "127.0.0.1";
const port = 8450;

server.listen(port, hostname, () => {
  console.log("Server running at http://" + hostname + ":" + port + "\n");
});
