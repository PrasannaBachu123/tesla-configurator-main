import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOptionsComponent } from './car-options.component';

describe('CarOptionsComponent', () => {
  let component: CarOptionsComponent;
  let fixture: ComponentFixture<CarOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
