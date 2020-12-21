import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseUpdateComponent } from './user-course-update.component';

describe('UserCourseUpdateComponent', () => {
  let component: UserCourseUpdateComponent;
  let fixture: ComponentFixture<UserCourseUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCourseUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCourseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
