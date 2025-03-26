import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormateursAddComponent } from './formateurs-add.component';

describe('FormateursAddComponent', () => {
  let component: FormateursAddComponent;
  let fixture: ComponentFixture<FormateursAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormateursAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormateursAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
