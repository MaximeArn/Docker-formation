const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();

MongoClient.connect("mongodb://db", { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error(err);
  } else {
    console.info("CONNEXION DB OK");
    count = client.db("test").collection("count");
  }
});

app.get("/", (req, res) => {
  count
    .findOneAndUpdate({}, { $inc: { count: 1 } }, { returnNewDocument: true })
    .then((doc) => {
      const count = doc.value;
      res.status(200).json(count.count);
    });
});

app.listen(80);
