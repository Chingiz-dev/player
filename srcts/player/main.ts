import PlayerComponent from "./player.component";
import Playlist from "../model/playlist";
import Song from "../model/song";
import Store from "../Store";

const myStore = new Store('playlist');
let songsList = JSON.parse(myStore.getFromStore());

const entryPoint: HTMLElement = document.querySelector(".root");

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

const album = new Playlist("Chingiz Playlist", songsObj);
const player = new PlayerComponent(entryPoint, album, myStore);