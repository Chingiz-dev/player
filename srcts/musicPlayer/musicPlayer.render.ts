import CoreRender from "../CoreRender";

class MusicPlayerRender extends CoreRender {
  musicPlayerElement;

  durationSlider;
  volumeSlider;
  currentTime;
  totalDuration;
  trackName;
  artistName;

  randomTrackBtn;
  prevTrackBtn;
  playPauseBtn;
  nextTrackBtn;
  repeatTrackBtn;

  renderPlay() {
    this.playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }

  renderPause() {
    this.playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
  
  removeActiveRepeat() {
    this.repeatTrackBtn.classList.remove("fa-repeat--active");
  }

  setActiveRepeat() {
    this.repeatTrackBtn.classList.add("fa-repeat--active");
  }

  removeActiveShuffle() {
    this.randomTrackBtn.classList.remove("fa-shuffle--active");
  }

  setActiveShuffle() {
    this.randomTrackBtn.classList.add("fa-shuffle--active");
  }

  getSliders() {
    const sliders = this.createElement("div", ["sliders"]);

    const sliderContainer1 = this.createElement("div", ["sliders__slider-container"]);
    this.currentTime = this.createElement("span", ["current-time"]);
    this.totalDuration = this.createElement("span", ["total-duration"]);
    this.durationSlider = this.createElement("input", ["slider--duration"]);
    this.durationSlider.type = 'range';
    this.durationSlider.min = 0;
    this.durationSlider.max = 100;
    this.durationSlider.value = 0;
    sliderContainer1.append(this.currentTime, this.durationSlider, this.totalDuration);

    const sliderContainer2 = this.createElement("div", ["sliders__slider-container"]);
    this.volumeSlider = this.createElement("input", ["slider--duration"]);
    this.volumeSlider.type = 'range';
    this.volumeSlider.min = 1;
    this.volumeSlider.max = 100;
    this.volumeSlider.value = 50;
    const i1 = this.createElement("i", ["fa-solid", "fa-volume-low"]);
    const i2 = this.createElement("i", ["fa-solid", "fa-volume-high"]);
    sliderContainer2.append(i1, this.volumeSlider, i2);

    sliders.append(sliderContainer1, sliderContainer2);
    return sliders;
  }

  getButtons() {
    const buttons = this.createElement("div", ["buttons"]);

    this.randomTrackBtn = this.createElement("div", ["buttons__button", "buttons__button--random-track"]);
    const i3 = this.createElement("i", ["fa-solid", "fa-shuffle"]);
    this.randomTrackBtn.appendChild(i3);

    this.prevTrackBtn = this.createElement("div", ["buttons__button", "buttons__button--prev-track"]);
    const i4 = this.createElement("i", ["fa-solid", "fa-backward-step"]);
    this.prevTrackBtn.appendChild(i4);

    this.playPauseBtn = this.createElement("div", ["buttons__button", "buttons__button--play-pause"]);
    const i5 = this.createElement("i", ["fa-solid", "fa-play"]);
    this.playPauseBtn.appendChild(i5);

    this.nextTrackBtn = this.createElement("div", ["buttons__button", "buttons__button--next-track"]);
    const i6 = this.createElement("i", ["fa-solid", "fa-forward-step"]);
    this.nextTrackBtn.appendChild(i6);

    this.repeatTrackBtn = this.createElement("div", ["buttons__button", "buttons__button--repeat-track"]);
    const i7 = this.createElement("i", ["fa-solid", "fa-repeat"]);
    this.repeatTrackBtn.appendChild(i7);

    buttons.append(this.randomTrackBtn, this.prevTrackBtn, this.playPauseBtn, this.nextTrackBtn, this.repeatTrackBtn);

    return buttons;
  }

  render(node: HTMLElement) {
    node.innerHTML = "";
    this.musicPlayerElement = this.createElement("div", ['music-player']);

    this.trackName = this.createElement("div", ['track-name']);
    this.artistName = this.createElement("div", ['artist-name']);
    this.musicPlayerElement.append(this.trackName, this.artistName);
    this.musicPlayerElement.appendChild(this.getSliders());
    this.musicPlayerElement.appendChild(this.getButtons());
    
    node.appendChild(this.musicPlayerElement);
  }
}

export default MusicPlayerRender;
