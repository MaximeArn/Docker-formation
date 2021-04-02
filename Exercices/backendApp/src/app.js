const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const serv = express();
let collection;

MongoClient.connect("mongodb://db", { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.log("ERROR -->  ", err);
  } else {
    console.log("well connected to the database");
    count = client.db("test").collection("count");
  }
});

serv.get("/", async (req, res, next) => {
  const { value } = await count.findOneAndUpdate(
    {},
    { $inc: { value: 1 } },
    { returnNewDocument: true }
  );
  console.log(value);
  res.send(`I receive ${value.value} GET request for the moment `);
});

serv.listen(80, () => {
  console.log("server listening on localhost");
});
