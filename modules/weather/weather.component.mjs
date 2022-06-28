import WeatherRender from './weather.render.mjs';
import Config from '../config.mjs';


export default class Weather {
<<<<<<< HEAD
  latitude;
  longitude;
  APIKey = Config.APIKEY;
=======
  Latitude;
  Longitude;
  APIKey = "4707c6f9f3798460246fc88412e9b118"; // key not active
>>>>>>> 612dfc09ac86113218066a4890799a21e4a7abe2
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
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.APIKey}`)
      .then((resp) => { return resp.json() })
      .then((data) => {
        this.weatherRender.render(this.weatherPoint, data);
      }).catch(err=>console.log(err))
  }
}
