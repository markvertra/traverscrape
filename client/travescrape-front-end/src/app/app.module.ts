import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { PlaygroundPageComponent } from './pages/playground-page/playground-page.component';

import { GygSearchComponent } from './components/gyg-search/gyg-search.component';

import { DataService } from './services/data.service';
import { LandingComponent } from './pages/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    PlaygroundPageComponent,
    GygSearchComponent,
    LandingComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
