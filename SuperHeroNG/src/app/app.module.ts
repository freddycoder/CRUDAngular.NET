import { ApplicationRef, DoBootstrap, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule, 
        RouterOutlet
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
})
export class AppModule implements DoBootstrap {
    ngDoBootstrap(appRef: ApplicationRef): void {
        appRef.bootstrap(AppComponent);
    }
 }
