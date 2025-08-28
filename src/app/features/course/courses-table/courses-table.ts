import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Course } from '../../../shared/entities/entity';
import { ServicesLogin } from '../../../shared/services/services.login';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-courses-table',
  imports: [MatTableModule,  MatIconModule, CommonModule],
  templateUrl: './courses-table.html',
  styleUrl: './courses-table.scss'
})
export class CoursesTable {

  @Input() courses: Course[] = [];
  @Output() CourseEdit= new EventEmitter<Course>();
  @Output() CourseDelete= new EventEmitter<Course>();

  displayedColumns: string[] = ['id', 'title', 'description' ,'acciones']
  role: Boolean = false;
  constructor(private _service: ServicesLogin) {


  }

  ngOnInit(): void {
    

    this._service.isAdmin().subscribe({

      next: (value: Boolean) => {

        this.role = value


      }

    })

   

  }

 
  onDelete(Course: Course){

    this.CourseDelete.emit(Course);

  }

  onEdit(Course: Course){

  
    let editCourse!: Course;

    editCourse = Course ;

    this.CourseEdit.emit(editCourse);

  }


}
