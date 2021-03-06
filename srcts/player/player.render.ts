import CoreRender from "../CoreRender";
import Playlist from "../model/playlist";
import Song from "../model/song";

class PlayerRender extends CoreRender {
  playSongHTMLElement: HTMLElement;
  playFavoriteOnlyHTMLElement: HTMLElement;
  titleHTMLElement: HTMLElement;
  inputListTitleElement: HTMLInputElement;
  playerHTMLElement: HTMLElement;
  inputControlsElement: HTMLElement;
  songEditHTMLElement: HTMLElement;
  songListHTMLElement: HTMLElement;
  songHTMLDeleteElement: HTMLElement;


  addSongHTMLElement: HTMLElement;
  sortSongsHTMLElement: HTMLElement;

  titleControlsElement: HTMLElement;
  inputTitleElement: HTMLInputElement;
  inputSingerElement: HTMLInputElement;
  inputGenreElement: HTMLInputElement;
  inputURLElement: HTMLInputElement;
  inputSubmitElement: HTMLInputElement;

  getControlsHTMLElements(): HTMLElement {
    this.inputControlsElement = this.createElement("div", ["player__controls"]);
    this.titleControlsElement = this.createElement('h2', ['control__title'], 'adding a song');
    this.inputTitleElement = this.createInputElement(
      ["song__input"]
    );
    this.inputTitleElement.placeholder = "enter song name";
    this.inputSingerElement = this.createInputElement(
      ["song__input"]
    );
    this.inputSingerElement.placeholder = "enter singer name";
    this.inputGenreElement = this.createInputElement(
      ["song__input"]
    );
    this.inputGenreElement.placeholder = "enter genre";
    this.inputURLElement = this.createInputElement(
      ["song__input"]
    );
    this.inputURLElement.placeholder = "enter url";
    this.inputSubmitElement = this.createInputElement(
      ["song__input-submit"]
    );
    this.inputSubmitElement.value = "submit";
    this.inputSubmitElement.type = "submit";
    this.inputSubmitElement.disabled = true;
    this.inputControlsElement.append(
      this.titleControlsElement,
      this.inputTitleElement,
      this.inputSingerElement,
      this.inputGenreElement,
      this.inputURLElement,
      this.inputSubmitElement
    );
    return this.inputControlsElement;
  }

  getSongElement(song: Song): HTMLElement {
    const songHTMLElement: HTMLElement = this.createElement("div", ["player__song"]);

    const songHTMLDeleteElement: HTMLElement = this.createElement("i", ["song__delete", "fa-solid", "fa-times"]);
    songHTMLDeleteElement.setAttribute('data-del-id', String(song.id));

    const songFavoriteHTMLElement: HTMLElement = this.createElement('i', ["song__fav", "fa-solid"]);
    songFavoriteHTMLElement.classList.add(!!song.favorite ? "fa-thumbs-up" : "fa-thumbs-down");
    songFavoriteHTMLElement.setAttribute('data-fav-id', String(song.id));


    const songHTMLPlayElement: HTMLElement = this.createElement("i", ["fa-solid", "fa-play"]);
    songHTMLPlayElement.setAttribute('data-play-id', String(song.id));

    const titleHTMLelement: HTMLElement = this.createElement(
      "div",
      ["song__title"],
      song.title
    );
    const singerHTMLelement: HTMLElement = this.createElement(
      "div",
      ["song__singer"],
      song.singer
    );
    const genreHTMLelement: HTMLElement = this.createElement(
      "div",
      ["song__genre"],
      song.genre
    );
    songHTMLElement.append(
      songHTMLDeleteElement,
      songFavoriteHTMLElement,
      songHTMLPlayElement,
      titleHTMLelement,
      singerHTMLelement,
      genreHTMLelement,
    );
    return songHTMLElement;
  }

  getsongElements(player: Playlist): HTMLElement[] {
    return player.playlist.map((song: Song) => this.getSongElement(song));
  }

  getSongListElement(player: Playlist): HTMLElement {
    this.songListHTMLElement = this.createElement("div", [
      "player__song-list",
    ]);
    const songHTMLElements: HTMLElement[] = this.getsongElements(player);
    songHTMLElements.forEach((element) =>
      this.songListHTMLElement.appendChild(element)
    );
    return this.songListHTMLElement;
  }

  renderSongListElement(player: Playlist): void {
    this.songListHTMLElement.innerHTML = "";
    const songHTMLElements: HTMLElement[] = this.getsongElements(player);
    songHTMLElements.forEach((element) =>
      this.songListHTMLElement.appendChild(element)
    );
  }

  getTitleElement(player: Playlist): HTMLElement {
    return this.titleHTMLElement = this.createElement(
      "div",
      ["player__title"],
      `<em>${player.name}</em>`
    );
  }

  getTitleInputElement(): HTMLInputElement {
    this.inputListTitleElement = this.createInputElement(
      ["song__input"]
    );
    this.inputListTitleElement.placeholder = "change playlist name";
    return this.inputListTitleElement;
  }

  renderTitleElement(title: string): void {
    this.titleHTMLElement.innerHTML = `<em>${title}</em>`;
  }

  render(node: HTMLElement, player: Playlist, classList: string[] = []): void {
    node.innerHTML = "";
    this.playerHTMLElement = this.createElement("div", [
      "player",
      ...classList,
    ]);
    this.playSongHTMLElement = this.createElement("div", ["music__player"]);
    this.playFavoriteOnlyHTMLElement = this.createElement("button", ["button__favorite"]);
    this.playFavoriteOnlyHTMLElement.innerHTML = "Play only Favorite";
    this.playerHTMLElement.appendChild(this.getTitleElement(player));
    this.playerHTMLElement.appendChild(this.getTitleInputElement());
    this.playerHTMLElement.appendChild(this.getControlsHTMLElements());
    this.playerHTMLElement.appendChild(this.playSongHTMLElement);
    this.playerHTMLElement.appendChild(this.playFavoriteOnlyHTMLElement);
    this.playerHTMLElement.appendChild(this.getSongListElement(player));

    node.appendChild(this.playerHTMLElement);
  }
}

export default PlayerRender;
