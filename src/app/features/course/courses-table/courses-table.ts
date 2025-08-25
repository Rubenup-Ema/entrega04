import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { Course } from '../../../shared/entities/entity';



@Component({
  selector: 'app-courses-table',
  imports: [MatTableModule,  MatIconModule],
  templateUrl: './courses-table.html',
  styleUrl: './courses-table.scss'
})
export class CoursesTable {

  @Input() courses: Course[] = [];
  @Output() CourseEdit= new EventEmitter<Course>();
  @Output() CourseDelete= new EventEmitter<Course>();

  displayedColumns: string[] = ['id', 'title', 'description' ,'acciones']
  role = '';
  constructor() {


  }

  ngOnInit(): void {
    
   this.role = sessionStorage.getItem("role") || '';


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
