import PlayerComponent from "./modules/player/player.component.mjs";
import Player from "./modules/player/models/player.mjs";
import songsList from "../../db.json" assert { type: "json" };
import DetailedSong from "./modules/player/models/detailedSong.mjs";
import Song from "./modules/player/models/song.mjs";

const entryPoint = document.querySelector(".root");

const songsObj = songsList.map((s) => {
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

const album = new Player("Chingiz Playlist", songsObj);
const player = new PlayerComponent(entryPoint, album);
const song = new Song(3, "fugees", "no woman, no cry", "rap", true);
// player.addSong(song);
setTimeout(()=>player.addSong(song),2000);
setTimeout(()=>player.changeTitle('hoj'),1000);

