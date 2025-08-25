import { Component, OnInit } from '@angular/core';
import { StudentsTable } from "./students-table/students-table";
import { ServiceStudents } from './students-service/service.students';
import { Course, Student } from '../../shared/entities/entity';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../shared/utils/confirm-dialog/confirm-dialog';
import { Message } from '../../shared/services/message';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddStudent } from "./add-student/add-student";
import { CoursesService } from '../course/courses-service/courses.service';
import { EditStudent } from './edit-student/edit-student';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-students',
  imports: [StudentsTable, FormsModule, CommonModule, AddStudent,EditStudent, MatIcon],
  templateUrl: './students.html',
  styleUrl: './students.scss'
})
export class Students implements OnInit {

  courses: Course[] = [];
  students: Student[] = [];
  editStudent!: Student;
  formVisible: boolean[] = [true,false,false]; // [list, add, edit]
  constructor(private _servicios:ServiceStudents, private _serviciosC: CoursesService, private dialog: MatDialog, private snackBar:Message) {



  }

   async ngOnInit() {
     await this.loadCourses();
    
     this.formVisible[0] = true;
  }

  async loadStudents() {

    await this._servicios.loadStudents().subscribe({
      next:   (data:Student[]) => {

          this.students = data;
          this.students.forEach(element=> {

            element.title = this.titleCourse(element.courseId);

          })
          this.students = [...this.students];
          this.noChangeNewSudent(true);

         

        }, error: (err) => {

          this.snackBar.show(err.message);

        },
        complete: ()=> {

          this.students = [...this.students];

        }
    }
      
      

      
    ) 

  }


   titleCourse(id:number) {

      const curso = this.courses.find(item => item.id.toString() === id.toString());

      if (curso) {

        return curso.title

      } else {

        return "NOT COURSING"

      }

   }

  async loadCourses() {

    await this._serviciosC.loadCourses().subscribe(
      
       {
        next: (response:Course[]) => {

          this.courses = response;

        },
        error: (err) => {

          this.snackBar.show(`UPS!! ha pasado algo ${err.message}`)

        },

        complete: ()=>{

            this.loadStudents();

        }

       }


      
    ) 

  }

  newStudent() {

    this.formVisible = [false,true,false];

  }

  noChangeNewSudent(value: boolean) {


    this.formVisible = [value,false,false];


  }

 

   addStudent(student: Student) {


    this._servicios.addStudent(student).subscribe({

      next:(data:Student) => {

        if (data) {
          this.snackBar.show('ADDED Student!!!');
         
         
        } 

      },
      error: (err) =>{

         this.snackBar.show(err.message);

      },
      complete: ()=>{
        this.loadStudents();
      }
      }
    )


  }

  editedStudent(studentEdit: Student) {

    this._servicios.editStudent(studentEdit).subscribe({

      next:(data:Student) => {

        if (data) {
          this.snackBar.show('UPDATE Student!!!');
          const index = this.students.findIndex(student => student.id === studentEdit.id);

  
          if (index !== -1) {
         
          var course = this.courses.find(course => course.id == studentEdit.courseId);
          studentEdit.title = "" + course?.title;
          this.students[index] = {...studentEdit};
          this.students = [...this.students];
          
          } 
          this.noChangeNewSudent(true);
      }
      },
      error: (err) =>{

         this.snackBar.show(err.message);

      }
      }
    )


  }

  onEdit(studentEdit: Student) {

    
    this.editStudent = studentEdit;   
    this.formVisible = [false,false,true]

  }

 onDelete(studentDelete: Student) {

    const dialogRef = this.dialog.open(ConfirmDialog, {
    width: '450px',
    height: '200px',
    data: { mensaje: '¿Estás seguro de eliminar al estudiante ' + studentDelete.name +  '?' }
  });

  dialogRef.afterClosed().subscribe(resultado => {
    if (resultado) {
      this._servicios.deleteStudent(studentDelete.id).subscribe(

         {

            next: (response: Student)=> {
              
              if(response) {

                  this.students = this.students.filter(student => student.id !== studentDelete.id);
                
               
                this.snackBar.show('DELETED Student!!!');

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
