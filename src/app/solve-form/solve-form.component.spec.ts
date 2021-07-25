import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveFormComponent } from './solve-form.component';

describe('SolveFormComponent', () => {
  let component: SolveFormComponent;
  let fixture: ComponentFixture<SolveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolveFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
