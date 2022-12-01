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
const port = 8000;
const server = app.listen(port, listening);
 function listening(){
    console.log(`running on localhost: ${port}`);
  };

  // Callback function to complete GET '/all'
app.get('/all', sendData);
function sendData (request, response) {
  response.send(projectData);
};

//Post Route
app.post('/add', callBack);
function callBack(req,res){
  res.send('POST received');
}

const data = [];

app.post('/weather', addWeather);

function addWeather (req,res){
    data.push(req.body);
};





