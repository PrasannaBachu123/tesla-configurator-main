export interface CarOptions {
  configs: Configs[];
  towHitch: boolean;
  yoke: boolean;
}

export interface Configs {
  id: number;
  description: string;
  range: number;
  speed: number;
  price: number;
  towHitch: boolean;
  yoke: boolean;
}
