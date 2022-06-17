import PlayerRender from "./player.render.mjs";
import DetailedSong from "./models/detailedSong.mjs";
import Song from "./models/song.mjs";

class PlayerComponent {
  playerRender;
  album;
  
  constructor(entryPoint, album) {
    this.playerRender = new PlayerRender();
    this.album = album;
    this.playerRender.render(entryPoint, this.album, [
      "some",
    ]);
  }

  addSong(song) {
    this.album.addSongs(song);
    this.playerRender.render(document.querySelector(".root"), this.album, [
      "some",
    ]);
    // this.playerRender.renderListElement(this.album);
  }

  sortSongs() {
    this.album.sortSongs();
    this.playerRender.render(document.querySelector(".root"), this.album, [
      "some",
    ]);
  }

  deleteSong(id) {
    this.album.deleteSong(id);
    this.playerRender.render(document.querySelector(".root"), this.album, [
      "some",
    ]);
  }
}

export default PlayerComponent;
