/* Global Variables */
// API URL  and APIKey
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = 'cbcc3079d870a8e1433045013f9bbe87';

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

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

// GET
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

// POST
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.parse(data), // body data type must match "Content-Type" header        
  });

    try {
      const newData = await response.json();
      // console.log(newData);
      return newData
    }catch(error) {
    console.log("error", error);
    // appropriately handle the error
    }
};
postData('/weather', {addWeather})
