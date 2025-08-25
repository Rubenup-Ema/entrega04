import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Courses } from './course';

describe('Course', () => {
  let component: Courses;
  let fixture: ComponentFixture<Courses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Courses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Courses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
