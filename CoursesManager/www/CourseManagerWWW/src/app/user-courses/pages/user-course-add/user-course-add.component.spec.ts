import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCourseAddComponent } from './user-course-add.component';

describe('UserCourseAddComponent', () => {
  let component: UserCourseAddComponent;
  let fixture: ComponentFixture<UserCourseAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserCourseAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCourseAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
