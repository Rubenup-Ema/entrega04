import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoursesTable } from './courses-table/courses-table';
import { CoursesService } from './courses-service/courses.service';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '../../shared/services/message';
import { ConfirmDialog } from '../../shared/utils/confirm-dialog/confirm-dialog';
import { Course } from '../../shared/entities/entity';
import { CommonModule } from '@angular/common';
import { AddCourse } from "./add-course/add-course";
import { EditCourse } from './edit-course/edit-course';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-course',
  imports: [CoursesTable, CommonModule, AddCourse, EditCourse, MatIcon],
  templateUrl: './course.html',
  styleUrl: './course.scss'
})
export class Courses implements OnInit{

  editCourse!: Course;
  courses: Course[] = [];
  formVisible: boolean[] = [false,false,false]; // [list, add, edit]

  constructor(private _servicios: CoursesService, private dialog: MatDialog, private snackBar:Message) {



  }

  ngOnInit(): void {
    
     this.loadCourses();
     this.formVisible[0] = true;

  }

  loadCourses() {

    this._servicios.loadCourses().subscribe({

      next: (response)=> {

              this.courses = response;
              this.noChangeNewCourse(true);

      },
      error: (err) => {
        console.log(err);
        this.snackBar.show(`UPS!! ha pasado algo ${err.message}`)
      },
      complete: ()=> {
        
        console.log('Proceso completado!!')
      },
    }
      
    ) 

  }

  newCourse() {

    this.formVisible = [false,true,false];

  }

  noChangeNewCourse(value: boolean) {

    this.formVisible = [value,false,false];


  }

  addCourse(course: Course) {

    this._servicios.addCourse(course).subscribe({

        next:(response:Course) => {

        if (response) {
            this.snackBar.show('REGISTERED Course!!!');
          this.loadCourses();
          
          } 
          this.noChangeNewCourse(true);
      }
      ,
      error: (err) =>{

         this.snackBar.show(err.message);

      }
      }
    )


  }

  editedCourse(courseEdit: Course) {

    this._servicios.editCourse(courseEdit).subscribe({

      next:(response:Course) => {

        if (response) {
          this.snackBar.show('UPDATED Course!!!');
          const index = this.courses.findIndex(course => course.id === courseEdit.id);

  
          if (index !== -1) {

          this.courses[index] = {...courseEdit};
          this.courses = [...this.courses];
          
          } 
          this.noChangeEditCourse(true);
      }
      },
      error: (err) =>{

         this.snackBar.show(err.message);

      }
      }
    )


  }

  onEdit(courseEdit: Course) {

    
    this.editCourse = courseEdit;   
    this.formVisible = [false,false,true]

  }

  noChangeEditCourse(value: boolean) {

    this.formVisible = [value,false,false];


  }

   onDelete(courseDelete: Course) {
  
      const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '450px',
      height: '250px',
      data: { mensaje: '¿Estás seguro de eliminar el curso ' + courseDelete.title + '?' }
    });
  
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this._servicios.deleteCourse(courseDelete.id).subscribe(
          
          {

            next: (value: Course)=> {
              
              if(value) {

                  this.courses = this.courses.filter(course => course.id !== courseDelete.id);
                
               
                this.snackBar.show('DELETED Course!!!');

              }
            },
            error: (err)=>{

              console.log(err);
              this.snackBar.show(`Ha sucedido lo siguiente ${err.message}`);

            }

          }

         
  
        )
      } else {
        console.log('El usuario canceló');
      }
    });
  
    }


}
