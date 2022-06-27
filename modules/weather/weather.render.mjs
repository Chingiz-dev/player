import CoreRender from "../CoreRender.mjs";

class WeatherRender extends CoreRender {
  render(node, data, classList = []) {
    node.innerHTML = "";
    const weatherHTMLElement = this.createElement('div', ["weather__info"]);
    weatherHTMLElement.innerHTML =
      `<div> 
    ${data.name} &emsp;
    Temperature: ${(data.main.temp - 273).toFixed()}&deg;C &emsp;     
    Feel like: ${(data.main.feels_like - 273).toFixed()}&deg;C &emsp;   
    Humidity: ${data.main.humidity}% &emsp; 
    Wind: ${data.wind.speed} km/h &emsp; 
    Pressure: ${data.main.pressure}
    </div>`;

    node.appendChild(weatherHTMLElement);
  }
}

export default WeatherRender;