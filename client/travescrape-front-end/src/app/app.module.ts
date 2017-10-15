import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { PlaygroundPageComponent } from './pages/playground-page/playground-page.component';

import { GygSearchComponent } from './components/gyg-search/gyg-search.component';

import { DataService } from './services/data.service';


@NgModule({
  declarations: [
    AppComponent,
    PlaygroundPageComponent,
    GygSearchComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
