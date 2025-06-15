import { Component, inject, OnInit } from '@angular/core';
import { OpenApiService } from './services/openapi.service';
import { OpenAPI } from './models/openapi';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        RouterOutlet
    ]
})
export class AppComponent implements OnInit {
    private readonly service = inject(OpenApiService);
    spec?: OpenAPI;
    links: string[] = [];

    ngOnInit(): void {
        this.service.getOpenAPISpec().subscribe(result => {
            this.spec = result;
            this.links = Object.keys(result.components.schemas)
                               .sort((a, b) => a.localeCompare(b) * -1);
        });
    }
}
