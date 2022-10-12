var express = require("express");
var app = express();
require("dotenv").config();
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Pass}@cluster0.s87fbwh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const database = client.db("natural");
    console.log('DATABASE CONNECTED SUCCESSFULLY');
    const productCollection = database.collection('allNaturalsProducts')
    const pearlProductCollection = database.collection('pearlProducts')

    // All Naturals Products
    app.get('/allNaturalsProducts', async (req, res) => {
      const cursor = productCollection.find({})
      const products = await cursor.toArray()
      res.send(products)
    })
    // Pearl Products
    app.get('/pearlProducts', async (req, res) => {
      const cursor = pearlProductCollection.find({})
      const products = await cursor.toArray()
      res.send(products)
    })


  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running Server')
});

app.all("*", (req, res) => {
  res.send("No Route Found");
});

app.listen(port, () => {
  console.log("Listening to server");
});
