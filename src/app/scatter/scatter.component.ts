import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScatterService } from '../scatter.service';
@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {
  startingId:string;
  targetId:string = '';
  constructor(private router:Router, private scatterService:ScatterService) { }

  ngOnInit() {
    this.startingId = this.getNextCard();
    const now: Date = new Date();
    var rand = this.scatterService.getRNG(""+now.getMonth()+now.getDay()+now.getHours())
    this.router.navigate([`scatter/${this.scatterService.getNextCard(rand)}`],)
  }
  validId():boolean{
    return this.scatterService.isValidId(this.targetId);
  }

  startGameRandom(){
    this.router.navigate([`scatter/${this.startingId}`], )
  }
  startGame(){
    var potential = this.targetId=this.targetId.split(' ').join('')
    if(this.validId){
      this.router.navigate([`scatter/${potential.toUpperCase()}`],)
    }
    
  }

  getNextCard():string{
    return this.scatterService.getNextCard();
  }

}
