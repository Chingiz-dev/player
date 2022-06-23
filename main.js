import PlayerComponent from "./modules/player/player.component.mjs";
import Playlist from "./modules/player/models/playlist.mjs";
import songsList from "../../db.json" assert { type: "json" };
import DetailedSong from "./modules/player/models/detailedSong.mjs";
import Song from "./modules/player/models/song.mjs";
import Store from "./modules/Store.mjs";

const myStore = new Store('playlist');
// myStore.putToStore(JSON.stringify(songsList));
// myStore.clearStore();
let songsList1 = JSON.parse(myStore.getFromStore());
// console.log(songsList1);
// console.log(songsList);
if (!songsList1){
  songsList1 = songsList;
}

const entryPoint = document.querySelector(".root");

const songsObj = songsList1.map((s) => {
  return s.duration
    ? new DetailedSong(
        s.duration,
        s.desc,
        s.id,
        s.url,
        s.singer,
        s.title,
        s.genre,
        s.favorite,
        (s.date = new Date())
      )
    : new Song(
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
// setTimeout(()=>player.sortSongs(), 4000);

