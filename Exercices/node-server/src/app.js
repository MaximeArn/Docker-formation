const express = require("express");
const server = express();

server.get("*", (req, res) => {
  res.status(200).json("hello world refreshed !");
});

server.listen(80, () => {
  console.log("server started");
});
