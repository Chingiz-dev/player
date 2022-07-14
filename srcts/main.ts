import WeatherComponent from "./weather/weather.component";
import PlayerComponent from "./player/player.component";
import Playlist from "./model/playlist";
import Song from "./model/song";
import Store from "./Store";

const weatherPoint: HTMLElement = document.querySelector(".weath");
const entryPoint: HTMLElement = document.querySelector(".root");

const weather: WeatherComponent = new WeatherComponent(weatherPoint);
weather.getLocation();

const myStore: Store = new Store('playlist');
let songsList = JSON.parse(myStore.getFromStore());

const songsObj: Song[] = songsList.map((s: any) => {
  return new Song(
        s.id,
        s.url,
        s.singer,
        s.title,
        s.genre,
        s.favorite,
        (s.date = new Date())
      );
});

const album: Playlist = new Playlist("Chingiz Playlist", songsObj);
const player: PlayerComponent = new PlayerComponent(entryPoint, album, myStore);