// Initialize variables
const d = new Date();
const date = d.toDateString();

const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=cbcc3079d870a8e1433045013f9bbe87&units=imperial';

// Event listener for 'Enter' key press on feelings input
document.querySelector("#feelings").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.querySelector("#generate").click();
  }
});

// Event listener for "Generate" button click
document.querySelector("#generate").addEventListener("click", async (event) => {
  event.preventDefault();
  const zip = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;

  try {
    // Fetch weather data
    const weatherData = await getData(`${baseURL}${zip}${apiKey}`);

    // Prepare and post data
    if (weatherData.cod === 200) {
      const postData = {
        date,
        placeName: weatherData.name,
        feelings,
        description: weatherData.weather[0].description,
        temp: weatherData.main.temp,
      };
      
      await fetch("/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      // Fetch and update UI
      const allData = await fetch("/all").then((res) => res.json());
      updateUI(allData);
    } else {
      console.error(weatherData.message);
    }
  } catch (err) {
    console.error(err);
  }
});

// Function to fetch data from API
const getData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

// Function to update UI
const updateUI = (data) => {
  document.querySelector("#dateNow").textContent = data.date;
  document.querySelector("#temp").textContent = `${data.temp}°F`;
  document.querySelector("#content").textContent = data.feelings || "What do you feel?";
  document.querySelector("#placeName").textContent = data.placeName;
  document.querySelector("#description").textContent = 
    data.description.charAt(0).toUpperCase() + data.description.slice(1);

  // Change background image based on temperature
  const body = document.body;
  if (data.temp < 60) {
    body.style.backgroundImage = "url('img/cold.jpg')";
  } else if (data.temp >= 60 && data.temp < 80) {
    body.style.backgroundImage = "url('img/medium.jpg')";
  } else {
    body.style.backgroundImage = "url('img/hot.jpg')";
  }
};
