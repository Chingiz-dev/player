import PlayerRender from "./player.render.mjs";
import Player from "./models/player.mjs";
import DetailedSong from "./models/detailedSong.mjs";
import Song from "./models/song.mjs";
import songsList from "../../db.json" assert { type: "json" };

class PlayerController {
  playerRender = new PlayerRender();
  songsObj = songsList.map((s) => {
    return s.duration
      ? new DetailedSong(
          s.duration,
          s.lyrics,
          s.id,
          s.singer,
          s.title,
          s.genre,
          s.favorite,
          (s.date = new Date())
        )
      : new Song(
          s.id,
          s.singer,
          s.title,
          s.genre,
          s.favorite,
          (s.date = new Date())
        );
  });
  album = new Player("Chingiz Playlist", this.songsObj);

  constructor() {}

  renderPlayer() {
    this.playerRender.render(document.querySelector(".root"), this.album, [
      "some",
    ]);

    setTimeout(() => {
      this.album.addSongs(
        new Song(3, "fugees", "no woman, no cry", "rap", true)
      );
      this.playerRender.render(document.querySelector(".root"), this.album, [
        "some",
      ]);
    }, 2000);

    setTimeout(() => {
      this.album.sortSongs();
      this.playerRender.render(document.querySelector(".root"), this.album, [
        "some",
      ]);
    }, 4000);

    setTimeout(() => {
      this.album.deleteSong(1, 3);
      this.playerRender.render(document.querySelector(".root"), this.album, [
        "some",
      ]);
    }, 6000);
  }
}

export default PlayerController;
