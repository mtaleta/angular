import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
// Angular 的Observable沒有toPromise
//要從 RxJS 庫中導入
import 'rxjs/add/operator/toPromise'

import { Hero } from './hero';
// import { HEROES } from './mock-heroes';

@Injectable()
export class HeroService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  // getHeroesSlowly(): Promise<Hero[]> {
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(this.getHeroes()), 2000)
  //   })
  // }

  getHero(id: number): Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handleError);
  }
}