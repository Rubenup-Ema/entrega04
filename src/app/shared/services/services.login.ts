import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap, throwError } from 'rxjs';
import { DataLogin } from '../../home/login/login.entity';

@Injectable({
  providedIn: 'root'
})
export class ServicesLogin {
  
    //private url = "https://curso.sunsetmanager.com/api"

    private url="https://68a25a8ec5a31eb7bb1cc6a1.mockapi.io/"

    private data: DataLogin[] = [];

    constructor(private http:HttpClient) {

      

    }

    loadData(): Observable<DataLogin[]> {
    return this.http.get<DataLogin[]>(`${this.url}/user`).pipe(
      tap((response:DataLogin[]) => this.data = response) // guardamos en memoria
    );
  }


    validarLogin(email: string, password: string): Observable<DataLogin> {

      try {
        const user = this.data.find(user => user.email === email && user.password === password)

        if (user) {

          return of(user);

        } else {

          return throwError(() => ({
          statusCode: 401,
          message: 'user NOT FOUND'
        }));
        }

      } catch(err) {

         return throwError(() => ({
            statusCode: 500,
            message: err
          }));

      }




    }

}
