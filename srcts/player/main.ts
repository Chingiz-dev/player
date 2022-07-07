import PlayerComponent from "./player.component";
import Playlist from "../model/playlist";
import Song from "../model/song";
import Store from "../Store";

const myStore = new Store('playlist');
// myStore.putToStore(JSON.stringify(songsList));
// myStore.clearStore();
let songsList = JSON.parse(myStore.getFromStore());

console.log(songsList);
// if (!songsList1 || songsList1.length < 1){
//   songsList1 = songsList;
// }
// let curSL = JSON.parse(songsList);

const entryPoint: HTMLElement = document.querySelector(".rootTS");

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