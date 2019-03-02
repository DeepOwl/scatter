import { Component, OnInit } from '@angular/core';
import { Categories } from './categories';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-scatter-game',
  templateUrl: './scatter-game.component.html',
  styleUrls: ['./scatter-game.component.css']
})
export class ScatterGameComponent implements OnInit {
  public allCategories:string[] = Categories;
  public categories:string[];
  public rand;
  public next:string;
  constructor(private route:ActivatedRoute) { }
  public id:string;
  public showTimer:boolean = false;
  public toolbarColor = "primary";

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.initializeState(); // reset and set based on new parameter this time
    });  
  }

  initializeState(){
    const id = this.route.snapshot.paramMap.get('id');
    var seed = xmur3(id);
    this.rand = mulberry32(seed());
    this.getList(id);
    this.next = this.getNextCard()
  }
  getList( id: string){
    this.categories = this.getRandom(Categories, 10);
  }

  share(){
    /*
    if (navigator.share) {
      navigator.share({
          title: 'Web Fundamentals',
          text: 'Check out Web Fundamentals — it rocks!',
          url: 'https://developers.google.com/web',
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }*/
  }

  getNextCard(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(this.rand() * possible.length));  
    return text;
  }

  handleTimer(timeLeft:number){
    this.toolbarColor = "warn";
    setTimeout(res=>{
      this.toolbarColor = "accent";
    }, 100)
  }
    

  getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(this.rand() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

}

function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}


function xmur3(seed:string) {
  for(var i = 0, h = 1779033703 ^ seed.length; i < seed.length; i++)
      h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
      h = h << 13 | h >>> 19;
  return function() {
      h = Math.imul(h ^ h >>> 16, 2246822507);
      h = Math.imul(h ^ h >>> 13, 3266489909);
      return (h ^= h >>> 16) >>> 0;
  }
}
function sfc32(a, b, c, d) {
  return function() {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
    var t = (a + b) | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    d = d + 1 | 0;
    t = t + d | 0;
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
}
