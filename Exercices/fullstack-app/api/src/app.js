const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const app = express();

const mongoUrl = process.env.NODE_ENV === "prod" ? "" : "mongodb://db";

MongoClient.connect(mongoUrl, { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error(err);
  } else {
    console.info("CONNEXION DB OK");
    count = client.db("test").collection("count");
  }
});

app.get("/api/count", (req, res) => {
  count
    .findOneAndUpdate({}, { $inc: { count: 1 } }, { returnNewDocument: true })
    .then((doc) => {
      const count = doc.value;
      res.status(200).json(count.count);
    });
});

app.all("*", () => {
  res.status(404).end();
});

app.listen(80);
