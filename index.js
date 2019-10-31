const express = require('express');
const db = require('./data/db');

const server = express();

server.listen("4000", () => {
  console.log("()()() listening on port 4000 ()()()")
})

server.use(express.json());

server.get("/api/users", (req, res) => {
  res.send("hello")
})