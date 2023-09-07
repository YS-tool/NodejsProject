const http = require("http");

const config = require("platformsh-config").config();




const server = http.createServer(async function(_request, response) {

  // Make the output.
  const outputString = `Hello, World! This is Yanlin- A simple Node.js template for Platform.sh`

  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(outputString);
});

// Get PORT and start the server
server.listen(config.port, function() {
  console.log(`Listening on port ${config.port}`);
});