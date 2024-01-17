import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeslaCarsInfoService } from '../../services/tesla-cars-info.service';
import { CarOptions, Configs } from '../../models/car-options';
import { Subscription } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectedCarModel } from '../../models/car-model';

@Component({
  selector: 'app-car-options',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, CommonModule],
  providers: [TeslaCarsInfoService],
  templateUrl: './car-options.component.html',
  styleUrl: './car-options.component.scss',
})
export class CarOptionsComponent implements OnInit, OnDestroy {
  carOptions!: CarOptions;
  subscriptions: Subscription = new Subscription();
  selectedConfig!: Configs;
  selectedConfigId!: number;
  selectedModel!: SelectedCarModel;
  carImagePath: string = 'https://interstate21.com/tesla-app/images/';

  constructor(private readonly teslaCarsInfoService: TeslaCarsInfoService) {}

  ngOnInit(): void {
    this.selectedModel =
      JSON.parse(localStorage.getItem('selectedCarModel')!) || {}; 
    this.getCarOptions();
  }

  getCarOptions(): void {
    this.teslaCarsInfoService
      .getCarOptions(this.selectedModel.carModel.code)
      .subscribe((carOptions: CarOptions) => {
        this.carOptions = carOptions;
        this.selectedConfig = JSON.parse(
          localStorage.getItem('selectedCarOptions')!
        );
        if (this.selectedConfig && this.selectedConfig.id) {
          this.selectedConfigId = this.selectedConfig.id;
          this.getSelectedCarConfig();
        }
      });
  }

  getSelectedCarConfig(): void {
    this.selectedConfig = this.carOptions.configs.find(
      (config: Configs) => config.id === Number(this.selectedConfigId)
    )!;
    this.setSelectedCarOptions();
  }

  setSelectedCarOptions(): void {
    localStorage.setItem(
      'selectedCarOptions',
      JSON.stringify({ ...this.carOptions, ...this.selectedConfig })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
