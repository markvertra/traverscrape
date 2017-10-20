import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { PlaygroundPageComponent } from './pages/playground-page/playground-page.component';
import { GygSearchComponent } from './components/gyg-search/gyg-search.component';

import { productRoutes } from './routes/product-routing';

import { DataService } from './services/data.service';
import { LandingComponent } from './pages/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OperatorPageComponent } from './pages/operator-page/operator-page.component';


@NgModule({
  declarations: [
    AppComponent,
    PlaygroundPageComponent,
    GygSearchComponent,
    LandingComponent,
    NavbarComponent,
    OperatorPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(productRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
