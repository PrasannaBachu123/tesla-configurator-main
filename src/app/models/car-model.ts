export interface CarModel {
  code: string;
  description: string;
  colors: Colors[];
}

export interface Colors {
  code: string;
  description: string;
  price: number;
}

export interface SelectedCarModel {
  carModel: CarModel;
  carColor: Colors;
}
