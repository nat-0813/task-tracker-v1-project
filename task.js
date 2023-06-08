// Create a "close" button and append it to each list item

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}


// //created variables for each package
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
//creating instance for express-package we grab from node modules
const app = express();
//creating port for server
const port = 6000;
// //middleware to parse request bodies as JSON
app.use(bodyParser.json());

// // Endpoint to get all tasks from the file
app.get('/tasks', (req, res) => {
  fs.readFile('tasks.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.json(JSON.parse(data));
    }
  });
});
// // Endpoint to add a new task to the file
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  if (!newTask || !newTask.title || !newTask.description) {
    res.sendStatus(400);
    return;
  }

  fs.readFile('tasks.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const tasks = JSON.parse(data);
      tasks.push(newTask);
      fs.writeFile('tasks.txt', JSON.stringify(tasks), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      });
    }
  });
});

// // Endpoint to delete a task from the file
app.delete('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;

  fs.readFile('tasks.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const tasks = JSON.parse(data);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      fs.writeFile('tasks.txt', JSON.stringify(updatedTasks), 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

app.put('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body;

  fs.readFile('tasks.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      const tasks = JSON.parse(data);
      const index = tasks.findIndex((task) => task.id === taskId);

    }
  });
});






