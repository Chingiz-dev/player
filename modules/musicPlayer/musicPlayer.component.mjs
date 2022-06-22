import MusicPlayerRender from "./musicPlayer.render.mjs";

class MusicPlayerComponent {
  MRender;
  playList;
  currentTrack;

  time = "00:00";

  trackIndex = 0;
  isPlaying = false;
  isRandom = false;
  isOnRepeat = false;
  updateTimer;

  constructor(musicPoint, playList) {
    this.MRender = new MusicPlayerRender();
    this.playList = playList;
    this.MRender.render(musicPoint);
    this.MRender.durationSlider.addEventListener("change", this.goTo);
    this.MRender.volumeSlider.addEventListener("change", this.setVolume);
    this.MRender.playPauseBtn.addEventListener("click", this.playPauseTrack);
    this.MRender.randomTrackBtn.addEventListener("click", this.randomTrack);
    this.MRender.prevTrackBtn.addEventListener("click", this.prevTrack);
    this.MRender.nextTrackBtn.addEventListener("click", this.nextTrack);
    this.MRender.repeatTrackBtn.addEventListener("click", this.repeatTrack);

    this.MRender.currentTime.textContent = this.time;
    this.MRender.totalDuration.textContent = this.time;
    this.currentTrack = document.createElement("audio");

    this.currentTrack.volume = 0.5;
    this.loadTrack(this.trackIndex);
  }

  loadTrack(kIndex) {
    clearInterval(this.updateTimer);
    this.reset();

    this.currentTrack.src = this.playList[kIndex].url;
    this.currentTrack.load();

    this.MRender.trackName.textContent = this.playList[kIndex].title;
    this.MRender.artistName.textContent = this.playList[kIndex].singer;

    this.updateTimer = setInterval(this.setUpdate, 500);

    this.currentTrack.addEventListener("ended", this.nextTrackIfEnded);
  }

  reset() {
    this.MRender.currentTime.textContent = this.time;
    this.MRender.totalDuration.textContent = this.time;
    this.MRender.durationSlider.value = 0;
  }

  randomTrack = () => {
    this.isRandom ? this.pauseRandom() : this.playRandom();
  }

  playRandom = () => {
    this.isRandom = true;
    this.MRender.randomTrackBtn.classList.add("fa-shuffle--active");
  }

  pauseRandom = () => {
    this.isRandom = false;
    this.MRender.randomTrackBtn.classList.remove("fa-shuffle--active");
  }

  repeatTrack = () => {
    this.isOnRepeat ? this.pauseRepeat() : this.playRepeat();
  }

  playRepeat = () => {
    this.isOnRepeat = true;
    this.MRender.repeatTrackBtn.classList.add("fa-repeat--active");
  }

  pauseRepeat = () => {
    this.isOnRepeat = false;
    this.MRender.repeatTrackBtn.classList.remove("fa-repeat--active");
  }

  playPauseTrack = () => {
    this.isPlaying ? this.pauseTrack() : this.playTrack();
  }

  playTrack = () => {
    this.currentTrack.play();
    this.isPlaying = true;
    this.MRender.playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }

  pauseTrack = () => {
    this.currentTrack.pause();
    this.isPlaying = false;
    this.MRender.playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }

  nextTrack = () => {
    if (this.trackIndex < this.playList.length - 1 && !this.isRandom) {
      this.trackIndex += 1;
    } else if (this.trackIndex < this.playList.length - 1 && this.isRandom) {
      let randomIndex = Number.parseInt(Math.random() * this.playList.length);
      this.trackIndex = randomIndex;
    } else {
      this.trackIndex = 0;
    }

    this.loadTrack(this.trackIndex);
    this.playTrack();
  }

  nextTrackIfEnded = () => {
    if (this.trackIndex < this.playList.length - 1) {
      if (!this.isRandom && !this.isOnRepeat) {
        this.trackIndex += 1;
      } else if (this.isRandom && !this.isOnRepeat) {
        let randomIndex = Number.parseInt(Math.random() * this.playList.length);
        this.trackIndex = randomIndex;
      } else if (!this.isRandom && this.isOnRepeat) {
        this.trackIndex;
      } else if (this.isRandom && this.isOnRepeat) {
        this.trackIndex;
      }
    } else {
      this.trackIndex = 0;
    }

    this.loadTrack(this.trackIndex);
    this.playTrack();
  }

  prevTrack = () => {
    if (this.trackIndex > 0) {
      this.trackIndex -= 1;
    } else {
      this.trackIndex = this.playList.length - 1;
    }
    this.loadTrack(this.trackIndex);
    this.playTrack();
  }

  goTo = () => {
    let seekTo = this.currentTrack.duration * (this.MRender.durationSlider.value / 100);
    this.currentTrack.currentTime = seekTo;
  }

  setVolume = () => {
    this.currentTrack.volume = this.MRender.volumeSlider.value / 100;
  }

  setUpdate = () => {
    let seekDurationPosition = 0;
    if (!isNaN(this.currentTrack.duration)) {
      seekDurationPosition = this.currentTrack.currentTime * (100 / this.currentTrack.duration);
      this.MRender.durationSlider.value = seekDurationPosition;
      let currentMinutes = Math.floor(this.currentTrack.currentTime / 60);
      let currentSeconds = Math.floor(
        this.currentTrack.currentTime - currentMinutes * 60
      );
      let durationMinutes = Math.floor(this.currentTrack.duration / 60);
      let durationSeconds = Math.floor(
        this.currentTrack.duration - durationMinutes * 60
      );

      if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
      }
      if (durationSeconds < 10) {
        durationSeconds = "0" + durationSeconds;
      }
      if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
      }
      if (durationMinutes < 10) {
        durationMinutes = "0" + durationMinutes;
      }

      this.MRender.currentTime.textContent = currentMinutes + ":" + currentSeconds;
      this.MRender.totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }

  }
}
export default MusicPlayerComponent;
