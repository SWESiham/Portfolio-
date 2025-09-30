import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDashboard } from './about-dashboard';

describe('AboutDashboard', () => {
  let component: AboutDashboard;
  let fixture: ComponentFixture<AboutDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
