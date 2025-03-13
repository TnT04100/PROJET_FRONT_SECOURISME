import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiairesFormComponent } from './stagiaires-form.component';

describe('StagiairesFormComponent', () => {
  let component: StagiairesFormComponent;
  let fixture: ComponentFixture<StagiairesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StagiairesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StagiairesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
