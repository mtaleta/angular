import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from './hero.service';

// 告訴這個類，我們要實現OnInit接口。
import 'rxjs/add/operator/switchMap';
import { Hero } from './hero';
// import { Hero } from './hero';

@Component({
  selector: 'hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css']
})


export class HeroDetailComponent implements OnInit{
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}
  
  goBack(): void {
    this.location.back();
  }
  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => 
        this.heroService.getHero(+params.get('id')))
      .subscribe(hero => this.hero = hero);
  }
  @Input() hero: Hero;
}
