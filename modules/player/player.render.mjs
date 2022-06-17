import CoreRender from "../CoreRender.mjs";

class PlayerRender extends CoreRender {
  containerHTMLElement;
  titleHTMLElement;
  playerHTMLElement;
  controlsHTMLElement;
  songEditHTMLElement;
  songListHTMLElement;

  addSongHTMLElement;
  sortSongsHTMLElement;
  

  getControlsHTMLElements() {

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
    if (!!song.lyrics) {
      const lyricsHTMLelement = this.createElement(
        "div",
        ["song__lyrics"],
        song.lyrics
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

    this.playerHTMLElement.appendChild(this.getTitleElement(player));
    this.playerHTMLElement.appendChild(this.getSongListElement(player));

    node.appendChild(this.playerHTMLElement);
    console.log('rendering');
  }
}

export default PlayerRender;
