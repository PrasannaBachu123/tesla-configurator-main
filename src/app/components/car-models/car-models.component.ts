import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeslaCarsInfoService } from '../../services/tesla-cars-info.service';
import { Subscription } from 'rxjs';
import { CarModel, Colors, SelectedCarModel } from '../../models/car-model';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-models',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  providers: [TeslaCarsInfoService],
  templateUrl: './car-models.component.html',
  styleUrl: './car-models.component.scss',
})
export class CarModelsComponent implements OnInit, OnDestroy {
  carModels: CarModel[] = [];
  carColors: Colors[] = [];
  selectedCarModel: string = '';
  selectedCarColor: string = '';
  selectedCarModelInfo!: SelectedCarModel;
  carImagePath: string = 'https://interstate21.com/tesla-app/images/';
  subscriptions: Subscription = new Subscription();
  constructor(private teslaCarsInfoService: TeslaCarsInfoService) {}

  ngOnInit(): void {
    this.getCarModels();
  }

  getCarModels(): void {
    this.teslaCarsInfoService
      .getCarModels()
      .subscribe((carModels: CarModel[]) => {
        this.carModels = carModels;
        this.selectedCarModelInfo = JSON.parse(
          localStorage.getItem('selectedCarModel')!
        );
        if (
          this.selectedCarModelInfo &&
          this.selectedCarModelInfo?.carModel &&
          this.selectedCarModelInfo?.carColor
        ) {
          this.selectedCarModel = this.selectedCarModelInfo.carModel.code;
          this.selectedCarColor = this.selectedCarModelInfo.carColor.code;
          this.getSelectedCarModel();
        }
      });
  }

  getSelectedCarModel(): void {
    const selectedModel: CarModel[] = this.carModels.filter(
      (carModel: CarModel) => carModel.code === this.selectedCarModel
    );
    this.carColors = selectedModel.length ? selectedModel[0].colors : [];
    this.setSelectedCarModel();
  }

  getSelectedCarColor(): void {
    this.setSelectedCarModel();
  }

  setSelectedCarModel(): void {
    const model = this.carModels.find(
      (carModel: CarModel) => carModel.code === this.selectedCarModel
    );
    const color = this.carColors.find(
      (carColor: Colors) => carColor.code === this.selectedCarColor
    );
    const selectedCarModelInfo = {
      carModel: model,
      carColor: color,
    };
    localStorage.setItem(
      'selectedCarModel',
      JSON.stringify(selectedCarModelInfo)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
