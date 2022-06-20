import PlayerRender from "./player.render.mjs";
import DetailedSong from "./models/detailedSong.mjs";
import Song from "./models/song.mjs";

class PlayerComponent {
  playerRender;
  album;
  title;
  singer;
  genre;
  url;

  constructor(entryPoint, album) {
    this.playerRender = new PlayerRender();
    this.album = album;
    this.playerRender.render(entryPoint, this.album, ["some"]);

    this.title = this.playerRender.inputTitleElement;
    this.singer = this.playerRender.inputSingerElement;
    this.genre = this.playerRender.inputGenreElement;
    this.url = this.playerRender.inputURLElement;

    this.playerRender.inputListTitleElement.addEventListener("change", this.changeTitle);

    this.playerRender.inputSubmitElement.addEventListener(
      "click",
      this.addSong
    );
    this.title.addEventListener("change", this.changeInputs);
    this.singer.addEventListener("change", this.changeInputs);
    this.genre.addEventListener("change", this.changeInputs);
    this.url.addEventListener("change", this.changeInputs);


    this.playerRender.songListHTMLElement.addEventListener(
      "click",
      (event) => {
        const currentID = Number(event.target.getAttribute("data-id"));
        if (currentID !== null) {
          this.deleteSong(currentID);
        }
      }
    );
  }

  changeTitle = () => {
    this.album.name = this.playerRender.inputListTitleElement;
    this.playerRender.renderTitleElement(this.playerRender.inputListTitleElement.value);
    this.playerRender.inputListTitleElement.value = "";
  }

  changeInputs = (e) => {
    if (
      !!this.url.value &&
      !!this.singer.value &&
      !!this.title.value &&
      !!this.genre.value
    ) {
      this.playerRender.inputSubmitElement.disabled = false;
    }
  };

  addSong = (event) => {
    const song = new Song(
      this.getNewId(),
      this.url.value,
      this.singer.value,
      this.title.value,
      this.genre.value
    );
    this.url.value = "";
    this.singer.value = "";
    this.title.value = "";
    this.genre.value = "";
    this.playerRender.inputSubmitElement.disabled = true;

    this.album.addSongs(song);
    this.playerRender.renderSongListElement(this.album);
  };

  sortSongs() {
    this.album.sortSongs();
    this.playerRender.renderSongListElement(this.album);
  }

  deleteSong(id) {
    this.album.deleteSong(id);
    this.playerRender.renderSongListElement(this.album);
  }

  getNewId() {
    return this.album.playlist.length > 0
      ? Math.max(...this.album.playlist.map((song) => song.id)) + 1
      : 0;
  }
}

export default PlayerComponent;
