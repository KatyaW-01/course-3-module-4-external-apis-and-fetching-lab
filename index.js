// index.js

// Step 1: Fetch Data from the API
// - Create a function `fetchWeatherData(city)`
// - Use fetch() to retrieve data from the OpenWeather API
// - Handle the API response and parse the JSON
// - Log the data to the console for testing

async function fetchWeatherData(city) {
  try {
    const response = await
    fetch ("https://api.openweathermap.org/data/2.5/weather?q="+`${city}`+"&units=imperial&appid=c4c1c6d83f3d1314d8be68babc44438a")

    const data = await response.json()

    displayWeather(data)
  } catch (error) {
    displayError('Failed to load weather data. Please try again.')
    console.error('Error fetching user data:', error);
  }
}

// Step 2: Display Weather Data on the Page
// - Create a function `displayWeather(data)`
// - Dynamically update the DOM with weather details (e.g., temperature, humidity, weather description)
// - Ensure the function can handle the data format provided by the API

function displayWeather(data) {
  const weatherDisplay = document.querySelector("#weather-display")
  const weatherList = document.createElement('ul')
  weatherList.className = "weather-list"
  
  const description = data.weather[0].description
  
  const temperature = data.main.temp
 
  const humidity = data.main.humidity

  const weatherDetails = document.createElement('li')
  const weatherDetails2 = document.createElement('li')
  const weatherDetails3 = document.createElement('li')
  weatherDetails.textContent = `Forecast: ${description}`
  weatherDetails2.textContent = `Temperature: ${temperature}`
  weatherDetails3.textContent = `Humidity: ${humidity}`
  weatherList.append(weatherDetails,weatherDetails2,weatherDetails3)
  weatherDisplay.append(weatherList)

}

// Step 3: Handle User Input
// - Add an event listener to the button to capture user input
// - Retrieve the value from the input field
// - Call `fetchWeatherData(city)` with the user-provided city name

function initialize() {
  const button = document.querySelector("#fetch-weather")
  const input = document.querySelector("#city-input")

  button.addEventListener("click", () => {
    fetchWeatherData(input.value)
  })
}

initialize()

  

// Step 4: Implement Error Handling
// - Create a function `displayError(message)`
// - Handle invalid city names or network issues
// - Dynamically display error messages in a dedicated section of the page

function displayError(message) {
  const weatherDisplay = document.querySelector("#weather-display")
  const errorList = document.createElement('ul')
  const errorMessage = document.createElement('li')

  errorMessage.textContent = message

  errorList.append(errorMessage)
  weatherDisplay.append(errorList)
}

// Step 5: Optimize Code for Maintainability
// - Refactor repetitive code into reusable functions
// - Use async/await for better readability and to handle asynchronous operations
// - Ensure all reusable functions are modular and clearly named

// BONUS: Loading Indicator
// - Optionally, add a loading spinner or text while the API request is in progress

// BONUS: Additional Features
// - Explore adding more features, such as displaying additional weather details (e.g., wind speed, sunrise/sunset)
// - Handle edge cases, such as empty input or API rate limits

// Event Listener for Fetch Button
// - Attach the main event listener to the button to start the process


