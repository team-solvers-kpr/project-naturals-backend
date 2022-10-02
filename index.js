var express = require("express");
var app = express();
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.s87fbwh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const port = process.env.PORT || 3000;
async function run() {
  try {
    const collection = client.db("natural").collection("products");
    // Query for a movie that has the title 'The Room'

    app.get("/", async (req, res) => {
      const query = {};
      const movie = await collection.findOne(query);

      res.send(movie);
    });

    // since this method returns the matched document, not a cursor, print it directly
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.all("*", (req, res) => {
  res.send("No Route Found");
});
app.listen(port, () => {
  console.log("Listening to server");
});
