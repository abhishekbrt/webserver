const http = require("node:http");
const fs = require("fs");

const server = http.createServer();

// server.on("request", (req, res) => {
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.end(
//     JSON.stringify({
//       data: "Hello World!",
//     })
//   );
// });

server.on("request", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile("index.html", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(err);
    } else {
      console.log(data);
      res.end(data);
    }
  });
});

const hostname = "127.0.0.1";
const port = 8450;

server.listen(port, hostname, () => {
  console.log("Server running at http://" + hostname + ":" + port + "\n");
});
