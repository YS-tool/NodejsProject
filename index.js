const http = require("http");

const config = require("platformsh-config").config();
const mongodb = require("mongodb");

const usageExample = async function () {
  const credentials = config.credentials("mongodb");
  const MongoClient = mongodb.MongoClient;

  const client = await MongoClient.connect(
      config.formattedCredentials("mongodb", "mongodb")
  );

  const db = client.db(credentials["path"]);

  const collection = db.collection("startrek");

  const documents = [
      { name: "James Kirk", rank: "Admiral" },
      { name: "Jean-Luc Picard", rank: "Captain" },
      { name: "Benjamin Sisko", rank: "Prophet" },
      { name: "Katheryn Janeway", rank: "Captain" },
  ];

  await collection.insertMany(documents, { w: 1 });

  const result = await collection.find({ rank: "Captain" }).toArray();

  const outputRows = Object.values(result)
      .map(({ name, rank }) => `<tr><td>${name}</td><td>${rank}</td></tr>\n`)
      .join("\n");

  // Clean up after ourselves.
  collection.deleteMany();

  return `
  <table>
      <thead>
          <tr>
              <th>Name</th><th>Rank</th>
          </tr>
      </thhead>
      <tbody>
          ${outputRows}
      </tbody>
  </table>
  `;
};

const server = http.createServer(async function(_request, response) {

  // Make the output.
  const outputString = `Hello, World! This is Yanlin- A simple Node.js template for Platform.sh`

  const variable = await usageExample()
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(variable);
});

// Get PORT and start the server
server.listen(config.port, function() {
  console.log(`Listening on port ${config.port}`);
});

// server.listen(5555, function() {
//   console.log(`Listening on port 5555`);
// });