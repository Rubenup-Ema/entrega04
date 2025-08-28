import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

import { MatIconModule } from '@angular/material/icon';
import { FullnamePipe } from '../../../shared/pipe/fullname-pipe';
import { Student } from '../../../shared/entities/entity';
import { ServicesLogin } from '../../../shared/services/services.login';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-students-table',
  imports: [MatTableModule, FullnamePipe, MatIconModule, CommonModule],
  templateUrl: './students-table.html',
  styleUrl: './students-table.scss'
})
export class StudentsTable implements OnInit {

  @Input() students: Student[] = [];
 

  @Output() studentEdit= new EventEmitter<Student>();
  @Output() studentDelete= new EventEmitter<Student>();

  displayedColumns: string[] = ['name', 'surname', 'fullname', 'age', 'dni', 'average', 'title' , 'acciones']
  role: Boolean=false;
  constructor(private _service:ServicesLogin) {


  }

  ngOnInit(): void {
    
    this._service.isAdmin().subscribe({

      next: (value: Boolean) => {

        this.role = value


      }

    })




  }

 

  onDelete(student: Student){

    this.studentDelete.emit(student);

  }

  onEdit(student: Student){

    let editStudent!: Student;

    editStudent = { ...student };

    this.studentEdit.emit(editStudent);

  }

}

