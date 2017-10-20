import { Routes } from '@angular/router';
import { PlaygroundPageComponent } from '../pages/playground-page/playground-page.component';
import { OperatorPageComponent } from '../pages/operator-page/operator-page.component';

export const productRoutes: Routes  = [
  { path: '', component: PlaygroundPageComponent },
  { path: 'operator/:id', component: OperatorPageComponent },
];
