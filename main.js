const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const cors = require("cors")
const app = express();
app.use(cors());
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "english";
// Create a new MongoClient
const client = new MongoClient(url);
//
app.get("/", function (req, res, next) {
  getRandomDocs(res);
});

function getRandomDocs(res) {
  client.connect(function (err, client) {
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const diffcard = db.collection("diffcard");
    diffcard
      .aggregate([
        { $match: { _id: { $exists: true } } },
        { $sample: { size: 10 } },
      ])
      .toArray(function (err, docs) {
        res.send(docs);
        //client.close();
      });
  });
}

app.listen(3000, () => {
  console.log("jojo");
});
