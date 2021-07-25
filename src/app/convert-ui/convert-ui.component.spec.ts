import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertUIComponent } from './convert-ui.component';

describe('ConvertUIComponent', () => {
  let component: ConvertUIComponent;
  let fixture: ComponentFixture<ConvertUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertUIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
