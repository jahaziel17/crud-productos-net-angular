import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductoLeyComponent } from './list-producto-ley.component';

describe('ListProductoLeyComponent', () => {
  let component: ListProductoLeyComponent;
  let fixture: ComponentFixture<ListProductoLeyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProductoLeyComponent]
    });
    fixture = TestBed.createComponent(ListProductoLeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
