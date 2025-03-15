import { Component } from '@angular/core';
import { ListHeroComponent } from './components/list-hero/list-hero.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [ListHeroComponent]
})
export class AppComponent {
  
}
