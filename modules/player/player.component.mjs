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

  changeTitle(title) {
    this.album.name = title;
    this.playerRender.renderTitleElement(title);
  }

  addSong(song) {
    this.album.addSongs(song);
    this.playerRender.renderSongListElement(this.album);
  }

  sortSongs() {
    this.album.sortSongs();
    this.playerRender.renderSongListElement(this.album);
  }

  deleteSong(id) {
    this.album.deleteSong(id);
    this.playerRender.renderSongListElement(this.album);
  }
}

export default PlayerComponent;
