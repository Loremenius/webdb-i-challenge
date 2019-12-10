const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/api/accounts', (req, res) => {
    db.select('*').from('accounts')
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(error=>{
            console.log(error);
            res.status.json({errorMessage: "Error getting accounts"});
        });
});

server.get("/api/accounts/:id", (req, res) => {
    
    
    db.select("*").from("accounts").where({ id: req.params.id }).first() 
      .then(post => {
        res.status(200).json(post);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "Error getting the account" });
      });
  });

server.post('/api/accounts', (req, res) => {
    db.insert(req.body, "id").into('accounts')
        .then(data=>{
            res.status(200).json(data);
        })
        .catch(error=>{
            console.log(error);
            res.status.json({errorMessage: "Error adding account"});
        });
});

server.put("/api/accounts/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db("accounts").where({ id }) .update(changes)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: `${count} record(s) updated` });
        } else {
          res.status(404).json({ message: "Account not found" });
        }
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          errorMessage: "Error updating the account"
        });
      });
  });

  server.delete("/api/accounts/:id", (req, res) => {
    db("accounts").where({ id: req.params.id }).del()
      .then(count => {
        res.status(200).json({ message: `${count} record(s) removed` });
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({
          errorMessage: "Error removing the account"
        });
      });
  });

module.exports = server;