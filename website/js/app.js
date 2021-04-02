//
// sample api call = http://api.openweathermap.org/data/2.5/weather?zip=94040&appid=2280b30ce86e95696638946e12fced7a
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

const API_KEY = '2280b30ce86e95696638946e12fced7a';
const generateBtn = document.getElementById('generate');
const zipInput = document.getElementById('zip');
const errorMsg = document.querySelector('.errorMsg');
const feelingsInput = document.getElementById('feelings');

let date = new Date();
let newDate = date.getMonth()+'.'+ date.getDate()+'.'+ date.getFullYear();
// Event listener to add function to existing HTML DOM element
generateBtn.addEventListener('click', fetchData);


/* Function called by event listener */
function fetchData() {
  if(!zipInput.value || !feelingsInput.value) {
    errorMsg.textContent = 'Please fill in the required fields';
    return;
  }
  errorMsg.textContent = '';
  getWeatherData(baseURL, zipInput.value, API_KEY)
  .then(function(data) {
    if(data) {
      postData('/userInput', {
        temperature: data?.main?.temp,
        sunrise: data?.sys?.sunrise,
        sunset: data?.sys?.sunset,
        date: newDate,
        userResponse:feelingsInput.value
      }).then(updateHTMLContent)  
    } 
  })
}

/* Function to GET Web API Data*/
const getWeatherData = async (baseURL,zipCode, key) => {
  const blob = await fetch(`${baseURL}${zipCode}&units=metric&appid=${key}`);
  try {
    const data = await blob.json();
    return data;
  } catch(error) {
    console.log('Error gotten:', error);
  }
}

/* Function to POST data */
const postData = async(url = '', data = {}) => {
  const blob = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = await blob.json();
    return newData;
  } catch(error) {
  }
}

/* Function to GET Project Data */
const updateHTMLContent = async() => {
  const date = document.getElementById('date');
  const temperature = document.getElementById('temp');
  const content = document.getElementById('content');
  try {
    const blob = await fetch('all');
    const userData = await blob.json();
    temperature.innerHTML = `The temperature is ${userData.temperature}C`;
    date.innerHTML = `Weather journal entry at ${userData.date}`;
    content.innerHTML = `I understand you're feeling this way: ${userData.userResponse}`;
  } catch(error) {
    console.log('Error message:', error);
  }
}