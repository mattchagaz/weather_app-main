const apiKey = '2dd4f0fc77a1e265156f4f87a3bb4fb7'

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const umidityElement = document.querySelector('#umidity span')
const windElement = document.querySelector('#wind span')

const weatherContainer = document.querySelector('#weather-data')

const errorMessageContainer = document.querySelector('#error-message')
const loader = document.querySelector('#loader')

// Loader
const toggleLoader = () => {
  loader.classList.toggle('hide')
}

const getWeatherData = async city => {
  toggleLoader()

  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

  const res = await fetch(apiWeatherURL)
  const data = await res.json()

  toggleLoader()

  return data
}

// Tratamento de erro
const showErrorMessage = () => {
  errorMessageContainer.classList.remove('hide')
}

const hideInformation = () => {
  errorMessageContainer.classList.add('hide')
  weatherContainer.classList.add('hide')
}

const showWeatherData = async city => {
  hideInformation()

  const data = await getWeatherData(city)

  if (data.cod === '404') {
    showErrorMessage()
    return
  }

  cityElement.innerText = data.name
  tempElement.innerText = parseInt(data.main.temp)
  descElement.innerText = data.weather[0].description
  weatherIconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  )
  umidityElement.innerText = `${data.main.humidity}%`
  windElement.innerText = `${data.wind.speed}km/h`

  weatherContainer.classList.remove('hide')
}

searchBtn.addEventListener('click', async e => {
  e.preventDefault()

  const city = cityInput.value

  showWeatherData(city)
})

cityInput.addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    const city = e.target.value

    showWeatherData(city)
  }
})
