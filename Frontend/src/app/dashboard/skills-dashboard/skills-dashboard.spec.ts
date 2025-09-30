import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsDashboard } from './skills-dashboard';

describe('SkillsDashboard', () => {
  let component: SkillsDashboard;
  let fixture: ComponentFixture<SkillsDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
