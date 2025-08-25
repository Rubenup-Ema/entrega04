import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Course } from '../../../shared/entities/entity';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-course',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-course.html',
  styleUrl: './add-course.scss'
})
export class AddCourse implements OnInit {

 courseForm!: FormGroup;
  @Output() courseAdded = new EventEmitter<Course>();
  @Output() noChanges = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) {

  

  }

 ngOnInit(): void {

    this.courseForm = this.fb.group({

      id: [0, [Validators.required]],
      title: ['', Validators.required],
      description: ['', Validators.required]
     
    })
    
  }

  onSubmit() {


    this.courseAdded.emit(this.courseForm.value);


  }

  onReset() {

    this.courseForm.reset();
    this.noChanges.emit(true);

  }

}
