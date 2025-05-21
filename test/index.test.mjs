/**
 * @jest-environment jsdom
 */

import * as index from '../index.js'

describe('fetchWeatherData', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
    document.body.innerHTML = `
      <h1>Weather App</h1>
      <input type="text" id="city-input" placeholder="Enter city name">
      <button id="fetch-weather">Get Weather</button>
      <div id="weather-display"></div>
      <div id="error-message" class="hidden"></div>`;
  });

  it('should fetch weather data for a valid city', async () => {
    const mockResponse = {
      name: 'New York',
      main: { temp: 298.15, humidity: 50 },
      weather: [{ description: 'clear sky' }],
    }

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const data = await fetchWeatherData('New York')
    expect(data.name).toBe('New York')
    expect(data.main.temp).toBe(298.15)
    expect(data.weather[0].description).toBe('clear sky')
  })

  it('should call fetchWeatherData when button is clicked', () => {
    const spy = jest.spyOn(index, 'fetchWeatherData')

    const input = document.getElementById('city-input')
    const button = document.getElementById('fetch-weather')
    input.value = 'Denver'

    button.click()

    expect(spy).toHaveBeenCalledWith('Denver')
  })

  it('should throw an error for an invalid city', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    })

    await expect(fetchWeatherData('InvalidCity')).rejects.toThrow(
      'City not found'
    )
  })

  it('should throw an error for network issues', async () => {
    fetch.mockRejectedValueOnce(new Error('Network Error'))

    await expect(fetchWeatherData('New York')).rejects.toThrow('Network Error')
  })
})

describe('displayWeather', () => {
  let weatherDisplay;

  beforeEach(() => {
    document.body.innerHTML = `
      <h1>Weather App</h1>
      <input type="text" id="city-input" placeholder="Enter city name">
      <button id="fetch-weather">Get Weather</button>
      <div id="weather-display"></div>
      <div id="error-message" class="hidden"></div>`;

    weatherDisplay = document.getElementById('weather-display')
    
    jest.spyOn(index, 'displayWeather')

    const button = document.getElementById('fetch-weather');
    const input = document.getElementById('city-input');
    
    button.addEventListener('click', () => {
      index.displayWeather({
        name: input.ariaValueMax,
        main: {temp: 298.15, humidity: 50},
        weather: [{ description: 'clear sky' }]
      })
    })
  })

  afterEach(()=> {
    jest.restoreAllMocks()
  })

  it('should display weather data on the page', () => {

    const button = document.getElementById('fetch-weather')
    button.click()
    expect(index.displayWeather).toHaveBeenCalled()

    expect(weatherDisplay.innerHTML).toContain('New York')
    expect(weatherDisplay.innerHTML).toContain('25°C') // 298.15 Kelvin to Celsius
    expect(weatherDisplay.innerHTML).toContain('50%')
    expect(weatherDisplay.innerHTML).toContain('clear sky')
  })
})

describe('displayError', () => {
  let errorMessage;
  let button;

  beforeEach(() => {
    document.body.innerHTML = `
      <h1>Weather App</h1>
      <input type="text" id="city-input" placeholder="Enter city name">
      <button id="fetch-weather">Get Weather</button>
      <div id="weather-display"></div>
      <div id="error-message" class="hidden"></div>`
    errorMessage = document.getElementById('error-message')
    button = document.getElementById('fetch-weather')

    button.addEventListener('click', () => {
      index.displayError('City not found')
    })

    jest.spyOn(index, 'displayError')
  })

  it('should call displayError on button click', () => {
    button.click()

    expect(index.displayError).toHaveBeenCalledWith('City not found')
    expect(errorMessage.textContent).toBe('City not found')
    expect(errorMessage.classList.contains('hidden')).toBe(false)
  })
})
