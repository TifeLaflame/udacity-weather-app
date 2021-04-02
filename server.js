// Setup empty JS object to act as endpoint for all routes
require('dotenv').config();
let projectData = {}

// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 3002;

app.listen(port, () => {
  console.log(`Weather app: listening at http://localhost:${port}`);
});

// Callback to debug

// Initialize all route with a callback function
app.get('/all', getProjectData);

// Callback function to complete GET '/all'
function getProjectData(req, res) {
  res.send(projectData);
  console.log(projectData);
}
// Post Route
app.post('/userInput', addUserData);

function addUserData(req, res, next) {
  // console.log({body: req.body});
  userEntry = {
    temperature: req.body.temperature,
    date: req.body.date,
    sunrise: req.body.sunrise,
    sunset: req.body.sunset,
    userResponse: req.body.userResponse
  }
  projectData = userEntry;
  res.send(projectData);
 // console.log({projectData});

}
  