const express = require('express');
const db = require('./data/db');

const server = express();

server.listen("4000", () => {
  console.log("()()() listening on port 4000 ()()()")
})

server.use(express.json());


server.post("/api/users", (req, res) => {
  const userInfo = req.body

  db.insert(userInfo)
    .then(user => {
      res.status(201).json({success: true, user})
    })
    .catch(err => {
      res.status(500).json({success: false, err})
    })
})

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({success: false, err})
    })
})

server.get(`/api/users/:id`, (req, res) => {
  db.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json({success: true, user})
      } else {
        res.status(404).json({success: false, message: "The user with the specified ID does not exist."})
      }
    })
    .catch(err => {
      res.status(500).json({success: false, message: "server error"})
    })
})

server.delete("/api/users/:id", (req, res) => {
  db.remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json({success: true, message: "user deleted"})
      } else {
        res.status(404).json({success: false, message: "The user with the specified ID does not exist."})
      }
    })
    .catch(err => {
      res.status(500).json({success: false, massage: "server error"})
    })
    
})

server.put(`/api/users/:id`, (req, res) => {
  db.update(req.params.id, req.body)
    .then(user => {
      if (user) {
        res.status(200).json({succes: true, user})
      } else {
        res.status(404).json({success: false, message: "The user with the specified ID does not exist."})
      }
    })
    .catch(err => {
      res.status(500).json({success: false, massage: "server error"})
    })
})