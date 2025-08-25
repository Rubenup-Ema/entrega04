import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course, Student } from '../../../shared/entities/entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-student',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-student.html',
  styleUrl: './add-student.scss'
})
export class AddStudent implements OnInit {

  studentForm!: FormGroup;
  @Input() courses: Course[] =[];
  @Output() studentAdded = new EventEmitter<Student>();
  @Output() noChanges = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) {

  

  }

  ngOnInit(): void {

    this.studentForm = this.fb.group({

      id: [0, [Validators.required, Validators.min(0)]],
      codigo: ['', [Validators.required, Validators.minLength(5)]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: [0, [Validators.required, Validators.min(0)]],
      avg: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      email: ['',[Validators.required, Validators.email]],
      courseId:[0,[Validators.required, Validators.min(1)]],
      title: ['']
    })
    
  }

  onSubmit() {

    this.studentAdded.emit(this.studentForm.value);


  }

  onReset() {

    this.studentForm.reset();
    this.noChanges.emit(true);

  }
}
