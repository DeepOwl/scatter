import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import Speech from 'speak-tts' // es6

@Component({
  selector: 'app-game-timer',
  templateUrl: './game-timer.component.html',
  styleUrls: ['./game-timer.component.css']
})
export class GameTimerComponent implements OnInit {
  public showTimer:boolean = false;
  public timerActive:boolean = false;
  public timerMinutes:number = 3;
  public timeLeft:number;
  private interval;
  @Input() letter:string;
  private mute: boolean = false;
  public notify = [60, 30, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  @Output() timerAlert = new EventEmitter<number>();
  public timerConfig = {leftTime: 3, demand: true}
  speech;
  constructor() { }

  ngOnInit() {
    this.speech = new Speech() // will throw an exception if not browser supported
      if(this.speech.hasBrowserSupport()) { // returns a boolean
          console.log("speech synthesis supported")
          
      }

      this.speech
    .init({
      volume: 0.5,
      lang: "en-GB",
      rate: 1,
      pitch: 1,
      //'voice':'Google UK English Male',
      //'splitSentences': false,
      listeners: {
        onvoiceschanged: voices => {
          console.log("Voices changed", voices);
        }
      }
    })
    .then(data => {
      console.log("Speech is ready", data);
      //this.speak("Speech is ready");
      //_addVoicesList(data.voices);
      //_prepareSpeakButton(speech);
    })
    .catch(e => {
      console.error("An error occured while initializing : ", e);
    });
    this.resetTimer();
  }

  toggleTimer(){
    if(!this.showTimer){
      this.showTimer=true;
      this.timerMinutes = 3;
    } else {
      if(this.timerMinutes == 3){
        this.timerMinutes = 2;
      } else {
        this.showTimer = false;
      }

    }
    this.resetTimer();
  }

  togglePlay(){
    if(this.timerActive){
      this.pauseTimer();
    } else {
      this.playPressed();
    }
  }

  isTimerActive():boolean{
    return this.interval
  }

  playPressed(){
    clearInterval(this.interval);
    if(this.shouldSpeak()){
      this.speak(`words that start with ${this.letter}. ready? set? go!`).then(data=>{
        this.startTimer();
      });
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.timerActive = true;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        if(this.notify.includes(this.timeLeft)){
          this.speak(''+this.timeLeft);
          this.timerAlert.next(this.timeLeft);
        }
      } else {
        this.speak('time\'s up');
        this.resetTimer();
      }
    },1000)    
  }

  pauseTimer() {
    this.timerActive=false;
    clearInterval(this.interval);
  }

  resetTimer(){
    this.pauseTimer();
    this.timeLeft=this.timerMinutes*60;
  }

  shouldSpeak(){
    return !this.mute &&this.speech.hasBrowserSupport();
  }

  speak(utterance:string):Promise<any>{
    if(!this.shouldSpeak()) return new Promise<any>((res, error)=>{});
    return this.speech.speak(
    {
      text: utterance,
      queue: false,
      listeners: {
        onstart: () => {
          //console.log("Start utterance");
        },
        onend: () => {
          //console.log("End utterance");
        },
        onresume: () => {
          //console.log("Resume utterance");
        },
        onboundary: event => {
          // console.log(
          //   event.name +
          //     " boundary reached after " +
          //     event.elapsedTime +
          //     " milliseconds."
          // );
        }
      }
    });

  }
}
