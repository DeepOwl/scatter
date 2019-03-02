import { Component, OnInit, Output, EventEmitter } from '@angular/core';

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
  public notify = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  @Output() timerAlert = new EventEmitter<number>();
  public timerConfig = {leftTime: 3, demand: true}
  constructor() { }

  ngOnInit() {
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
      this.startTimer();
    }
  }

  isTimerActive():boolean{
    return this.interval
  }

  startTimer() {
    clearInterval(this.interval);
    this.timerActive = true;
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        if(this.notify.includes(this.timeLeft)){
          this.timerAlert.next(this.timeLeft);
        }
      } else {
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
}
