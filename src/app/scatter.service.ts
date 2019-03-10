import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScatterService {

  constructor() { }

  getRNG(id:string){
    var seed = xmur3(id);
    return mulberry32(seed());
  }

  getNextCard(rand?:any):string{
    if(!rand){
      rand = Math.random
    }
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = 0; i < 4; i++)
      text += possible.charAt(Math.floor(rand() * possible.length));  
    return text;
  }
  

  isValidId(id:string):boolean{
    var potential = id.split(' ').join('')
    return potential.length>2;
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