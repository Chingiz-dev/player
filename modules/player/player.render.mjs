import CoreRender from "../CoreRender.mjs";

class PlayerRender extends CoreRender {
  containerHTMLElement;
  titleHTMLElement;
  inputListTitleElement;
  playerHTMLElement;
  inputControlsElement;
  songEditHTMLElement;
  songListHTMLElement;

  addSongHTMLElement;
  sortSongsHTMLElement;

  titleControlsElement;
  inputTitleElement;
  inputSingerElement;
  inputGenreElement;
  inputURLElement;
  inputSubmitElement;
  

  getControlsHTMLElements() {
    this.inputControlsElement = this.createElement("div", ["player__controls"]);
    this.titleControlsElement = this.createElement('h2', ['control__title'], 'adding a song');
    this.inputTitleElement = this.createElement(
      "input",
      ["song__input"]
    );
    this.inputTitleElement.placeholder = "enter song name";
    this.inputSingerElement = this.createElement(
      "input",
      ["song__input"]
    );
    this.inputSingerElement.placeholder = "enter singer name";
    this.inputGenreElement = this.createElement(
      "input",
      ["song__input"]
    );
    this.inputGenreElement.placeholder = "enter genre";
    this.inputURLElement = this.createElement(
      "input",
      ["song__input"]
    );
    this.inputURLElement.placeholder = "enter url";
    this.inputSubmitElement = this.createElement(
      "input",
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

  getSongElement(song) {
    const songHTMLElement = this.createElement("div", ["player__song"]);
    const titleHTMLelement = this.createElement(
      "div",
      ["song__title"],
      song.title
    );
    const singerHTMLelement = this.createElement(
      "div",
      ["song__singer"],
      song.singer
    );
    const genreHTMLelement = this.createElement(
      "div",
      ["song__genre"],
      song.genre
    );
    songHTMLElement.append(
      titleHTMLelement,
      singerHTMLelement,
      genreHTMLelement
    );
    if (!!song.desc) {
      const lyricsHTMLelement = this.createElement(
        "div",
        ["song__desc"],
        song.desc
      );
      songHTMLElement.appendChild(lyricsHTMLelement);
    }
    return songHTMLElement;
  }

  getsongElements(player) {
    return player.playlist.map((song) => this.getSongElement(song));
  }

  getSongListElement(player) {
    this.songListHTMLElement = this.createElement("div", [
      "player__song-list",
    ]);
    const songHTMLElements = this.getsongElements(player);
    songHTMLElements.forEach((element) =>
    this.songListHTMLElement.appendChild(element)
    );
    return this.songListHTMLElement;
  }

  renderSongListElement(player) {
    this.songListHTMLElement.innerHTML = "";
    const songHTMLElements = this.getsongElements(player);
    songHTMLElements.forEach((element) =>
    this.songListHTMLElement.appendChild(element)
    );
    console.log('render playlist');
  }

  getTitleElement(player) {
    return this.titleHTMLElement = this.createElement(
      "div",
      ["player__title"],
      `<em>${player.name}</em>`
    );
  }

  getTitleInputElement(){    
    this.inputListTitleElement = this.createElement(
      "input",
      ["song__input"]
    );
    this.inputListTitleElement.placeholder = "change playlist name";
    return this.inputListTitleElement;
  }
  
  renderTitleElement(title) {
    this.titleHTMLElement.innerHTML = `<em>${title}</em>`;
    console.log('render title');
  }

  render(node, player, classList = []) {
    node.innerHTML = "";

    this.playerHTMLElement = this.createElement("div", [
      "player",
      ...classList,
    ]);

    this.playerHTMLElement.appendChild(this.getControlsHTMLElements());
    this.playerHTMLElement.appendChild(this.getTitleElement(player));
    this.playerHTMLElement.appendChild(this.getTitleInputElement());
    this.playerHTMLElement.appendChild(this.getSongListElement(player));

    node.appendChild(this.playerHTMLElement);
    console.log('rendering');
  }
}

export default PlayerRender;
