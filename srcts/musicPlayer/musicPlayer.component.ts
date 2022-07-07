import MusicPlayerRender from "./musicPlayer.render";
import Observable from "../observable";
import Song from "../model/song";

class MusicPlayerComponent {
  MRender;
  playList: Song[];
  playList$: Observable;
  currentTrack;

  time = "00:00";

  trackIndex = 0;
  isPlaying = false;
  isRandom = false;
  isOnRepeat = false;
  updateTimer;

  constructor(musicPoint: HTMLElement, playList: Song[]) {
    this.MRender = new MusicPlayerRender();
    
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
    
    this.playList = playList;
    this.playList$ = new Observable(this.playList);
    this.playList$.subscribe(1, this.loadTrack);
    this.playList$.next(this.playList);
    this.currentTrack.volume = 0.5;
    // use observable
    // this.loadTrack();
  }
  
  updatePlayList(playList: any) {
    this.playList = playList;
    this.playList$.next(this.playList);
    this.MRender.playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    this.isPlaying = false;
    this.trackIndex = 0;
    // use observable
    // this.loadTrack();
  }

  playFromPlayList(songID: number) {
    this.MRender.playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    this.isPlaying = false;
    this.trackIndex = this.playList.findIndex(item => item.id === songID);
    this.loadTrack();
    this.playTrack();
  }

  loadTrack = () => {
    clearInterval(this.updateTimer);
    this.reset();
    let t = this.trackIndex;
    this.currentTrack.src = this.playList[t]?.url;
    this.currentTrack.load();

    this.MRender.trackName.textContent = this.playList[t]?.title;
    this.MRender.artistName.textContent = this.playList[t]?.singer;

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
    this.MRender.setActiveShuffle();
  }

  pauseRandom = () => {
    this.isRandom = false;
    this.MRender.removeActiveShuffle();
  }

  repeatTrack = () => {
    this.isOnRepeat ? this.pauseRepeat() : this.playRepeat();
  }

  playRepeat = () => {
    this.isOnRepeat = true;
    this.MRender.setActiveRepeat();
  }

  pauseRepeat = () => {
    this.isOnRepeat = false;
    this.MRender.removeActiveRepeat();
  }

  playPauseTrack = () => {
    this.isPlaying ? this.pauseTrack() : this.playTrack();
  }

  playTrack = () => {
    this.currentTrack.play();
    this.isPlaying = true;
    this.MRender.renderPlay();
  }

  pauseTrack = () => {
    this.currentTrack.pause();
    this.isPlaying = false;
    this.MRender.renderPause();
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

    this.loadTrack();
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

    this.loadTrack();
    this.playTrack();
  }

  prevTrack = () => {
    if (this.trackIndex > 0) {
      this.trackIndex -= 1;
    } else {
      this.trackIndex = this.playList.length - 1;
    }
    this.loadTrack();
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
