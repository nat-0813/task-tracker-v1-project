const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { error } = require('console');

const app = express();
const port = 3000;

//Middle ware to parse JSON request bodies
app.use(bodyParser.text());

//Endpoint to get all tasks from the file
app.get('./tasks', (req,res)=>{
  fs.readFile('tasks.text', 'utf8',(err,data) =>{
if(err){
    console.log(error);
    res.sendStatus(200);
 } else {
      res.json(JSON.parse(data));
    }
  });
});

//Endpoint


