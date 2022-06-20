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
    this.playerRender.inputSubmitElement.addEventListener(
      "click",
      this.addSong
    );
  }

  changeTitle(title) {
    this.album.name = title;
    this.playerRender.renderTitleElement(title);
  }

  addSong = (event)=> {
    // this.playerRender.titleControlsElement;

    console.log(this.playerRender.inputTitleElement.value);
    const title = this.playerRender.inputTitleElement.value;
    const singer = this.playerRender.inputSingerElement.value;
    const genre = this.playerRender.inputGenreElement.value;
    const url = this.playerRender.inputURLElement.value;
    
    const song = new Song(this.getNewId, url,  singer, title,  genre);
    
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

  
  getNewId() {
    return this.library.books.length > 0
    ? Math.max(...this.album.song.map((spng) => song.id)) + 1
    : 0;
  }
}

export default PlayerComponent;
