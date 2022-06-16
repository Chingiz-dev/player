import CoreRender from "../CoreRender.mjs";

class PlayerRender extends CoreRender {
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

  getsongListElement(player) {
    const songListHTMLElement = this.createElement("div", [
      "player__song-list",
    ]);

    const songHTMLElements = this.getsongElements(player);
    songHTMLElements.forEach((element) =>
      songListHTMLElement.appendChild(element)
    );
    return songListHTMLElement;
  }

  getTitleElement(player) {
    return this.createElement(
      "div",
      ["player__title"],
      `<em>${player.name}</em>`
    );
  }

  render(node, player, classList = []) {
    node.innerHTML = "";

    const playerHTMLElement = this.createElement("div", [
      "player",
      ...classList,
    ]);

    playerHTMLElement.appendChild(this.getTitleElement(player));
    playerHTMLElement.appendChild(this.getsongListElement(player));

    node.appendChild(playerHTMLElement);
  }
}

export default PlayerRender;
