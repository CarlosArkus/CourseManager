import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseDeleteComponent } from './user-course-delete.component';

describe('UserCourseDeleteComponent', () => {
  let component: UserCourseDeleteComponent;
  let fixture: ComponentFixture<UserCourseDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCourseDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCourseDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
