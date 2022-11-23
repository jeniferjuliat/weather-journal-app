/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = 'cbcc3079d870a8e1433045013f9bbe87';

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const user = document.getElementById('user')



document.getElementById('generate').addEventListener('click', performAction);
function performAction(e){
  e.preventDefault();
  const zip =  document.getElementById('zip').value;
  const feelings = document.getElementById("feelings").value;
  getWeather(baseURL, zip, apiKey)

  .then(function(data) {
    console.log(data);
    postData('/add', {
      date: d, 
      temp: temp,
      content: feelings
    })
    updateUI();
  })
}; 

const getWeather = async (baseURL, zip, apiKey) => {
  const res = await fetch(
    `${baseURL}${zip}&appid=${apiKey}`);

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error",error);
  }
};

//  POST
const postData = async ( url = '', data = {})=>{
  console.log(data);
  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },       
      body: JSON.stringify(data), 
    });
    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    } catch(error) {
      console.log("error", error);
    }
  }

// GET
const updateUI = async () =>{
  const request = await fetch('/all');
  try {
  // Transform into JSON
  const allData = await request.json()
  console.log(allData)
  // Write updated data to DOM elements
  document.getElementById('temp').innerHTML = Math.round(allData[0].temp);
  document.getElementById('content').innerHTML = allData[0].feelings;
  document.getElementById("date").innerHTML = allData[0].date;
  }
  catch(error) {
    console.log("error",error);
    // appropriately handle the error
  }
};
