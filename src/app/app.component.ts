import { Component } from '@angular/core';
import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CAR_STEPS } from './constants/car-steps-constants';
import { CarStep } from './models/car-step';
import { SelectedCarModel } from './models/car-model';
import { Configs } from './models/car-options';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterModule, HttpClientModule, NgFor],
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  carSteps:CarStep[] = CAR_STEPS;
  selectedCarModel!: SelectedCarModel;
  selectedConfig!: Configs;

  constructor(private readonly router: Router) {}

  navigateToCarStep(carStep: CarStep): void {
    this.selectedCarModel = JSON.parse(
      localStorage.getItem('selectedCarModel')!
    );
    this.selectedConfig = JSON.parse(
      localStorage.getItem('selectedCarOptions')!
    );
    if (this.selectedCarModel) {
      const { carModel, carColor } = this.selectedCarModel;
      if (carModel?.code && carColor?.code) {
        if (carStep.id === 'step2') {
          this.router.navigate([carStep.routerLink]);
        } else if (
          this.selectedConfig &&
          this.selectedConfig.id &&
          carStep.id === 'step3'
        ) {
          this.router.navigate([carStep.routerLink]);
        } else if(carStep.id === 'step1') {
          this.router.navigate(['/']);
        }
      }
    } else {
      this.router.navigate(['/']);
    }
  }
}
