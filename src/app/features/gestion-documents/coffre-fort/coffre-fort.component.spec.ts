import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffreFortComponent } from './coffre-fort.component';

describe('CoffreFortComponent', () => {
  let component: CoffreFortComponent;
  let fixture: ComponentFixture<CoffreFortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffreFortComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffreFortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
