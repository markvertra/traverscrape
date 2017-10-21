import { Routes } from '@angular/router';
import { PlaygroundPageComponent } from '../pages/playground-page/playground-page.component';
import { OperatorPageComponent } from '../pages/operator-page/operator-page.component';
import { ProductPageComponent } from '../pages/product-page/product-page.component';

export const productRoutes: Routes  = [
  { path: '', component: PlaygroundPageComponent },
  { path: 'operator/:name', component: OperatorPageComponent },
  { path: 'product/:id', component: ProductPageComponent }
];
