import WeatherRender from './weather.render.mjs';

export default class Weather {
  Latitude;
  Longitude;
  APIKey = "4707c6f9f3798460246fc88412e9b118"; // key not active
  weatherPoint;
  weatherRender;

  constructor(weatherPoint) {
    this.weatherPoint = weatherPoint;
    this.weatherRender = new WeatherRender();
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.fetchWeather);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  fetchWeather = (position) => {
    this.Latitude = position.coords.latitude;
    this.Longitude = position.coords.longitude;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.Latitude}&lon=${this.Longitude}&appid=${this.APIKey}`)
      .then((resp) => { return resp.json() })
      .then((data) => {
        this.weatherRender.render(this.weatherPoint, data);
      }).catch(err=>console.log(err))
  }
}
