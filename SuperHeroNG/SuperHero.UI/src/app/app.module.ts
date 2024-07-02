import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditHeroComponent } from './components/edit-hero/edit-hero.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';  

@NgModule({ declarations: [
        AppComponent,
        EditHeroComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
