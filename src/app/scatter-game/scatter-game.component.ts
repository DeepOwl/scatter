import { Component, OnInit } from '@angular/core';
import { Categories } from './categories';
import { ActivatedRoute, Router } from '@angular/router';
import { NgNavigatorShareService } from 'ng-navigator-share';
import { MatSnackBar } from '@angular/material'
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-scatter-game',
  templateUrl: './scatter-game.component.html',
  styleUrls: ['./scatter-game.component.css'],
  animations: [
    trigger('flip', [
      state('flipped', style({ transform: 'rotateY(90deg)' })),
      state('unflipped', style({ transform: 'rotateY(0deg)' })),
      transition('flipped => unflipped', animate('200ms ease-in-out')),
      transition('unflipped => flipped', animate('200ms ease-in-out'))
    ])  
  ]
})
export class ScatterGameComponent implements OnInit {
  public allCategories: string[] = Categories;
  public categories: string[];
  public rand;
  public next: string;
  public id: string;
  public showTimer: boolean = false;
  public toolbarColor = "primary";
  public edit: boolean = true;
  public startLetter: string;
  public showLetter: boolean = false;
  public score: number = 0;
  public listLength: number = 10;
  public scoreArray: number[];
  public answers: string[];
  public subScore: number = 0;
  private savedAnswers = {};
  flip = 'unflipped';

  constructor(private route: ActivatedRoute, private router: Router, private ngNavigatorShareService: NgNavigatorShareService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.scoreArray = new Array<number>(this.listLength);
    this.answers = new Array<string>(this.listLength);
    for (var i = 0; i++; i < this.listLength) {
      this.scoreArray.push(0);
      this.answers.push('');
    }
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.initializeState(); // reset and set based on new parameter this time
    });
  }

  initializeState() {
    this.showLetter = false;
    const id = this.route.snapshot.paramMap.get('id');
    var seed = xmur3(id);
    this.rand = mulberry32(seed());
    this.getList(id);
    this.next = this.getNextCard()
    this.startLetter = this.getStartLetter()
    setAll(this.scoreArray, 0);
    try{
      this.answers = Object.assign([], this.savedAnswers[id])
    } catch(e){
      setAll(this.answers, '');
    }
  }
  getList(id: string) {
    this.categories = this.getRandom(Categories, this.listLength);
  }

  cyclePoints(index: number) {
    this.scoreArray[index] = (this.scoreArray[index] + 1) % 3
    this.subScore = this.scoreArray.reduce((total, num) => total + num)
  }

  nextCard() {
    this.flip = (this.flip === 'unflipped') ? 'flipped' : 'unflipped';
    if (this.flip == 'flipped') {
      setTimeout(() => {
        this.flip = 'unflipped';
        this.router.navigate([`scatter/${this.next}`]);
      }, 200);
    }
    this.score += this.subScore;
    this.subScore = 0;
    this.savedAnswers[this.id]=Object.assign([], this.answers);
    //this.router.navigate([`scatter/${this.next}`]);
  }

  getNextCard() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 4; i++)
      text += possible.charAt(Math.floor(this.rand() * possible.length));
    return text;
  }

  getStartLetter() {
    var possible = "ABCDEFGHIJKLMNOPRSTW";
    return possible.charAt(Math.floor(this.rand() * possible.length));
  }

  handleTimer(timeLeft: number) {
    this.toolbarColor = "accent";
    setTimeout(res => {
      this.toolbarColor = "primary";
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

  canShare():boolean{
    return this.ngNavigatorShareService.webNavigator.share;
  }

  async shareApi() {
    if (this.canShare()) {
      try {
        const sharedResponse = await this.ngNavigatorShareService.share({
          title: 'Scatter!',
          text: 'Join me in a game of scatter-cards',
          url: `https://www.cardy.fun/scatter/${this.id}`
        });
      } catch (error) {
        //console.log('You app is not shared, reason: ', error);
      }
    }
    else {
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = `https://cardy.fun/scatter/${this.id}`;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
      this.openSnackBar("Copied a shareable URL to your clipboard. Send it to others!", "OK")
    }

  }

  keytab(event) {
    //OK THIS IS BAD
    //first the current element, and pick the next one
    let element = event.srcElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement
    let inputs = element.querySelectorAll('input');
    var index = 0;
    var foundIndex = 0;
    var found = false;
    for (let inputElement of inputs) {
      if (inputElement === event.srcElement) {
        found = true;
        foundIndex = index;
      } else {
        if (found && inputElement.value.length < 2) {
          inputElement.focus();
          return; //stop searching
        }
      }
      index++;
    }
    //if we've reached the end of the list go back around
    for (let inputElement of inputs) {
      if (inputElement === event.srcElement) {
        //this means everything's filled, so just find the next
        inputs.item((foundIndex + 1) % this.listLength).focus();
        return;
      } else {
        if (inputElement.value.length < 2) {
          inputElement.focus();
          return; //stop searching
        }
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}

function mulberry32(a) {
  return function () {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}


function xmur3(seed: string) {
  for (var i = 0, h = 1779033703 ^ seed.length; i < seed.length; i++)
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
  h = h << 13 | h >>> 19;
  return function () {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h ^= h >>> 16) >>> 0;
  }
}
function sfc32(a, b, c, d) {
  return function () {
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

function setAll(a, v) {
  var i, n = a.length;
  for (i = 0; i < n; ++i) {
    a[i] = v;
  }
}