import WeatherComponent from "./weather.component";

const weatherPoint: HTMLElement = document.querySelector(".weath");

const weather: WeatherComponent = new WeatherComponent(weatherPoint);

weather.getLocation();