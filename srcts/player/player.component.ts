import AppRender from "./player.render";
// import DetailedSong from "./models/detailedSong.mjs";
import Song from "../model/song";
import Store from "../Store";
import MusicPlayerComponent from "../musicPlayer/musicPlayer.component";
import Playlist from "../model/playlist";

class PlayerComponent {
  appRender;
  myStore;

  musicPlayer: MusicPlayerComponent;
  entryNodeMusicPlayer: HTMLElement;

  album: Playlist;
  title;
  singer;
  genre;
  url;

  constructor(entryPoint: HTMLElement, album: Playlist, myStore: Store) {
    this.myStore = myStore;
    this.appRender = new AppRender();
    this.album = album;
    this.appRender.render(entryPoint, this.album, ["some"]);

    this.entryNodeMusicPlayer = this.appRender.playSongHTMLElement;
    this.musicPlayer = new MusicPlayerComponent(this.entryNodeMusicPlayer, this.album.playlist);

    this.title = this.appRender.inputTitleElement;
    this.singer = this.appRender.inputSingerElement;
    this.genre = this.appRender.inputGenreElement;
    this.url = this.appRender.inputURLElement;

    this.appRender.inputListTitleElement.addEventListener(
      "change",
      this.changeTitle
    );
    this.appRender.inputSubmitElement.addEventListener(
      "click",
      this.addSong
    );
    this.appRender.playFavoriteOnlyHTMLElement.addEventListener(
      "click",
      this.playFavorite
    );
    this.title.addEventListener("change", this.changeInputs);
    this.singer.addEventListener("change", this.changeInputs);
    this.genre.addEventListener("change", this.changeInputs);
    this.url.addEventListener("change", this.changeInputs);

    this.appRender.songListHTMLElement.addEventListener("click", (event) => {
      const delID = Number(event.target.getAttribute("data-del-id"));
      const favID = Number(event.target.getAttribute("data-fav-id"));
      const playID = Number(event.target.getAttribute("data-play-id"));
      if (playID !== 0) {
        this.playFromPlaylistPoint(playID);
      }
      if (delID !== 0) {
        this.deleteSong(delID);
      }
      if (favID !== 0) {
        this.toggleFavoriteSong(favID);
      }
    });
  }

  changeTitle = () => {
    this.album.name = this.appRender.inputListTitleElement.value;
    this.appRender.renderTitleElement(
      this.appRender.inputListTitleElement.value
    );
    this.appRender.inputListTitleElement.value = "";
  };

  changeInputs = () => {
    if (
      !!this.url.value &&
      !!this.singer.value &&
      !!this.title.value &&
      !!this.genre.value
    ) {
      this.appRender.inputSubmitElement.disabled = false;
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
    this.appRender.inputSubmitElement.disabled = true;

    this.album.addSongs(song);
    this.myStore.clearStore();
    this.myStore.putToStore(JSON.stringify(this.album.playlist));
    this.musicPlayer.updatePlayList(this.album.playlist);
    this.appRender.renderSongListElement(this.album);
  };

  sortSongs() {
    this.album.sortSongs();
    this.musicPlayer.updatePlayList(this.album.playlist);
    this.appRender.renderSongListElement(this.album);
  }

  playFavorite = () => {
    let favoriteSongs = this.album.getFavoriteSongs();
    if(favoriteSongs.length > 0){
      this.musicPlayer.updatePlayList(favoriteSongs);
    }
  }

  playFromPlaylistPoint(id: number) {
    this.musicPlayer.playFromPlayList(id, this.album.playlist);
  }

  deleteSong(id) {
    this.album.deleteSong(id);
    this.appRender.renderSongListElement(this.album);
    this.musicPlayer.updatePlayList(this.album.playlist);
    this.myStore.clearStore();
    this.myStore.putToStore(JSON.stringify(this.album.playlist));
  }

  toggleFavoriteSong(id) {
    this.album.toggleFavorite(id);
    this.appRender.renderSongListElement(this.album);
    this.myStore.clearStore();
    this.myStore.putToStore(JSON.stringify(this.album.playlist));
  }

  getNewId() {
    return this.album.playlist.length > 0
      ? Math.max(...this.album.playlist.map((song) => song.id)) + 1
      : 1;
  }
}

export default PlayerComponent;
