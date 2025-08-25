import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Course, Student } from '../../../shared/entities/entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-student',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-student.html',
  styleUrl: './edit-student.scss'
})
export class EditStudent implements OnInit {

  studentForm!: FormGroup;

   private _studentEdit!: Student;
  student: Student = {id:0, codigo:0, name:'',surname:'', email:'', age:0,avg:0,courseId:0, title:''}

  @Input() set studentEdit(value: Student) {

    if (value) {
      this._studentEdit = value;
      this.student = { ...value };

      if (this.studentForm) {

        this.loadStudentData();

      }

    }
  }

  @Input() courses: Course[] =[];
  @Output() studentEdited = new EventEmitter<Student>();
  @Output() noChanges = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder) {

  

  }

  loadStudentData(): void {

   this.studentForm.setValue({
    id: this.student.id,
    codigo: this.student.codigo,
    name: this.student.name,
    surname: this.student.surname,
    age:this.student.age,
    avg:this.student.avg,
    email:this.student.email,
    courseId:this.student.courseId,
    title:this.student.title,
  });

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

     if (this._studentEdit) {
      this.loadStudentData();
    }
    
  }

  onSubmit() {

    this.studentEdited.emit(this.studentForm.value);


  }

  onReset() {

    this.studentForm.reset();
    this.noChanges.emit(true);

  }

}
