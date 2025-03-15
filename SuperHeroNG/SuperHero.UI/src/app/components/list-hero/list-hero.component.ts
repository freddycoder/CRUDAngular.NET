import { Component, inject } from '@angular/core';
import { EditHeroComponent } from '../edit-hero/edit-hero.component';
import { SuperHero } from 'src/app/models/super-hero';
import { SuperHeroService } from 'src/app/services/super-hero.service';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-list-hero',
  templateUrl: './list-hero.component.html',
  styleUrl: './list-hero.component.css',
  imports: [
    MatCardModule, 
    MatTableModule, 
    EditHeroComponent,
    MatButtonModule
  ],
})
export class ListHeroComponent {
  private readonly superHeroService = inject(SuperHeroService);

  title = 'SuperHero.UI';
  heroes: SuperHero[] = [];
  selectedHero?: SuperHero;
  columnToDisplay = ['name', 'firstName', 'lastName', 'place', 'button']

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
