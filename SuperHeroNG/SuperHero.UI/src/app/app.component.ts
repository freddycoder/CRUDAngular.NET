import { Component, OnInit } from '@angular/core';
import { SuperHero } from './models/super-hero';
import { SuperHeroService } from './services/super-hero.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SuperHero.UI';
  heroes: SuperHero[] = [];
  selectedHero?: SuperHero;
  columnToDisplay = ['name', 'firstName', 'lastName', 'place', 'button']

  constructor(private superHeroService: SuperHeroService) {
    
  }

  ngOnInit() {
    this.superHeroService
      .getSuperHeroes()
      .subscribe((result: SuperHero[]) => {
        this.heroes = result;
      })
  }

  initNewHero() {
    this.selectedHero = new SuperHero();
  }

  editHero(hero: SuperHero) {
    this.selectedHero = hero;
  }

  heroesUpdated(heroes: SuperHero[]) {
    this.heroes = heroes;
  }
}
