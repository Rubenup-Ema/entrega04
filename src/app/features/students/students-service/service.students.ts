import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Students } from '../students';
import { Student } from '../../../shared/entities/entity';

@Injectable({
  providedIn: 'root'
})
export class ServiceStudents {
  
    private url = "https://68a3040bc5a31eb7bb1ea2d9.mockapi.io";
    constructor(private http:HttpClient) {


    }

    loadStudents(): Observable<Student[]> {

      return this.http.get<Student[]>(`${this.url}/student`);

    }

     addStudent(student: Student):Observable<Student>  {

      return this.http.post<Student>(`${this.url}/student`,student);
    }

    editStudent(student: Student): Observable<Student> {

      return this.http.put<Student>(`${this.url}/student/${student.id}`,student);
    }
     
     deleteStudent(id:number): Observable<Student> {

      return this.http.delete<Student>(`${this.url}/student/${id}`);

    }
}
