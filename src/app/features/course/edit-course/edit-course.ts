import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course } from '../../../shared/entities/entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-course',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.scss'
})
export class EditCourse implements OnInit {

 courseForm!: FormGroup;
  @Output() courseEdited = new EventEmitter<Course>();
  @Output() noChanges = new EventEmitter<boolean>();

   private _courseEdit!: Course;
  course: Course = {id: 0, title:'', description:''};
 
  @Input() set courseEdit(value: Course) {

    if (value) {
      this._courseEdit = value;
      this.course = { ...value };

      if (this.courseForm) {

        this.loadCourseData();

      }

    }
  }

  constructor(private fb: FormBuilder) {

  

  }

loadCourseData(): void {

   this.courseForm.setValue({
    id: this.course.id,
    title: this.course.title,
    description: this.course.description,
  });

}

 ngOnInit(): void {

    this.courseForm = this.fb.group({

      id: [0, [Validators.required]],
      title: ['', Validators.required],
      description: ['', Validators.required],
     
    })

    if (this._courseEdit) {
      this.loadCourseData();
    }
    
  }

  onSubmit() {

  
    this.courseEdited.emit(this.courseForm.value);


  }

  onReset() {

    this.noChanges.emit(true);

  }

}
