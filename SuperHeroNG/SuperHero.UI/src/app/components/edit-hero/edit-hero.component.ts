import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SuperHero } from 'src/app/models/super-hero';
import { OpenApiService } from 'src/app/services/openapi.service';

@Component({
    selector: 'app-edit-hero',
    templateUrl: './edit-hero.component.html',
    styleUrls: ['./edit-hero.component.css'],
    imports: [
      NgIf,
      MatFormFieldModule,
      MatButtonModule,
      MatInputModule,
      FormsModule
    ]
})
export class EditHeroComponent {
  private readonly superHeroService = inject(OpenApiService);

  @Input() hero?: SuperHero;
  @Output() heroesUpdated = new EventEmitter<SuperHero[]>();

  updateHero(hero: SuperHero) {
    this.superHeroService.update<SuperHero>("SuperHero", hero).subscribe(result => {
      this.heroesUpdated.emit(result);
    });
  }

  deleteHero(hero: SuperHero) {
    this.superHeroService.delete<SuperHero>("SuperHero", hero.id).subscribe(result => {
      this.heroesUpdated.emit(result);
      this.hero = undefined;
    });
  }

  createHero(hero: SuperHero) {
    this.superHeroService.create("SuperHero", hero).subscribe(result => {
      this.heroesUpdated.emit(result);
    });
  }
}
