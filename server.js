// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//Post Route
app.post('/add', (req, res) => {
    newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
   }
   projectData = newEntry;
  });


// Callback function to complete GET '/all'
app.get('all', (req,res) => {
  res.send(projectData);
  });


// Setup Server
const port = 8000;
const server = app.listen(port, () =>
{console.log(`running on localhost: ${port}`)
});

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//Post Route
app.post('/add', (req, res) => {
    newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
   }
   projectData = newEntry;
  });


// Callback function to complete GET '/all'
app.get('all', (req,res) => {
  res.send(projectData);
  });


// Setup Server
const port = 8000;
const server = app.listen(port, () =>
{console.log(`running on localhost: ${port}`)
});

