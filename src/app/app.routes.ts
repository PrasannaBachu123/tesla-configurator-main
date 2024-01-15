import { Routes } from '@angular/router';
import { CarModelsComponent } from './components/car-models/car-models.component';
import { CarOptionsComponent } from './components/car-options/car-options.component';
import { CarSummaryComponent } from './components/car-summary/car-summary.component';

export const routes: Routes = [
  { path: '', component: CarModelsComponent},
  {
    path: 'car-options',
    component: CarOptionsComponent,
    pathMatch: 'full',
  },
  {
    path: 'car-summary',
    component: CarSummaryComponent,
    pathMatch: 'full',
  },
];
