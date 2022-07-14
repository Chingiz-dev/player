import WeatherRender from './weather.render'
import Config from '../Config';

export default class WeatherComponent {
  private latitude: number;
  private longitude: number;
  private APIKey: string = Config.APIKEY;
  weatherPoint: HTMLElement;
  weatherRender: WeatherRender;

  constructor(weatherPoint: HTMLElement) {
    this.weatherPoint = weatherPoint;
    this.weatherRender = new WeatherRender();
  }

  public getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.fetchWeather);
    } else {
     console.log("Geolocation is not supported by this browser.");
    }
  }

  private fetchWeather = (position: GeolocationPosition): void => {
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${this.APIKey}`)
      .then((resp) => { return resp.json() })
      .then((data) => {
        this.weatherRender.render(this.weatherPoint, data);
      }).catch(err=>console.log(err))
  }
}