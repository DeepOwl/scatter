import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {
  startingId:string;
  targetId:string = '';
  constructor(private router:Router) { }

  ngOnInit() {
    this.startingId = this.getNextCard();
  }
  validId():boolean{
    var potential = this.targetId.split(' ').join('')
    return potential.length>2;
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

  getNextCard(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 4; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));  
    return text;
  }

}
