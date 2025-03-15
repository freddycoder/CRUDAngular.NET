import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SuperHero } from 'src/app/models/super-hero';
import { SuperHeroService } from 'src/app/services/super-hero.service';

@Component({
    selector: 'app-edit-hero',
    templateUrl: './edit-hero.component.html',
    styleUrls: ['./edit-hero.component.css'],
    imports: [
      NgIf,
      MatFormFieldModule,
      FormsModule
    ]
})
export class EditHeroComponent {

  @Input() hero?: SuperHero;
  @Output() heroesUpdated = new EventEmitter<SuperHero[]>();

  constructor(private readonly superHeroService: SuperHeroService) { }

  updateHero(hero: SuperHero) {
    this.superHeroService.updateSuperHeroes(hero).subscribe(result => {
      this.heroesUpdated.emit(result);
    })
  }

  deleteHero(hero: SuperHero) {
    this.superHeroService.deleteHero(hero).subscribe(result => {
      this.heroesUpdated.emit(result);
    })
  }

  createHero(hero: SuperHero) {
    this.superHeroService.createHero(hero).subscribe(result => {
      this.heroesUpdated.emit(result);
    })
  }
}
