import { Component, OnInit } from '@angular/core';
import { SelectedCarModel } from '../../models/car-model';
import { Configs } from '../../models/car-options';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-car-summary',
  standalone: true,
  imports: [NgIf],
  templateUrl: './car-summary.component.html',
  styleUrl: './car-summary.component.scss',
})
export class CarSummaryComponent implements OnInit {
  selectedModel!: SelectedCarModel;
  selectedConfig!: Configs;
  carImagePath: string = 'https://interstate21.com/tesla-app/images/';
  
  ngOnInit(): void {
    this.selectedModel =
      JSON.parse(localStorage.getItem('selectedCarModel')!) || {};
    this.selectedConfig = JSON.parse(
      localStorage.getItem('selectedCarOptions')!
    );
  }
}
