import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from '../models/car-model';
import { CarOptions } from '../models/car-options';

@Injectable({ providedIn: 'root' })
export class TeslaCarsInfoService {
  constructor(private http: HttpClient) {}

  getCarModels(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>(`/models`);
  }

  getCarOptions(code: string): Observable<CarOptions> {
    return this.http.get<CarOptions>(`/options/${code}`);
  }
}
