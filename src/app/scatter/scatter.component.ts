import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {
  startingId:string;
  constructor(private router:Router) { }

  ngOnInit() {
    this.startingId = this.getNextCard();
  }

  startGame(){
    this.router.navigate([`scatter/${this.startingId}`], )
  }

  getNextCard(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 4; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));  
    return text;
  }

}
