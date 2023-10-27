import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoLeyComponent } from './producto-ley.component';

describe('ProductoLeyComponent', () => {
  let component: ProductoLeyComponent;
  let fixture: ComponentFixture<ProductoLeyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductoLeyComponent]
    });
    fixture = TestBed.createComponent(ProductoLeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
