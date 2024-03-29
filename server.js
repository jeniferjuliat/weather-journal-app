// Setup empty JS object to act as endpoint for all routes
projectData = {};

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

// Setup Server
const port = 8008;

// POST 
app.post("/add", async function(req, res){
  const info = await req.body;
  projectData = info;
  res.send(projectData);
});


  // GET 
  app.get("/all", async (req, res) => {
    if(projectData){
    res.send(projectData);
    }
});


// server setup
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };



