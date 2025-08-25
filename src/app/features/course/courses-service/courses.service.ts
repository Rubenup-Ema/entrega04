import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Course } from '../../../shared/entities/entity';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  
  private url = "https://68a25a8ec5a31eb7bb1cc6a1.mockapi.io";

    constructor(private http:HttpClient) {


    }

    loadCourses(): Observable<Course[]> {

      return this.http.get<Course[]>(`${this.url}/course`)

    }

    addCourse(course:Course): Observable<Course> {

       return this.http.post<Course>(`${this.url}/course`,course)
    }

     editCourse(course:Course): Observable<Course> {

       return this.http.put<Course>(`${this.url}/course/${course.id}`,course)

    }

      deleteCourse(id:number): Observable<Course> {

        return this.http.delete<Course>(`${this.url}/course/${id}`)
    }

}
