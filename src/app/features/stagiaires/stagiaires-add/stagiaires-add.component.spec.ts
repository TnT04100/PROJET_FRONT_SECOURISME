import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiairesAddComponent } from './stagiaires-add.component';

describe('StagiairesAddComponent', () => {
  let component: StagiairesAddComponent;
  let fixture: ComponentFixture<StagiairesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StagiairesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StagiairesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
