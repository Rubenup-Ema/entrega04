import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/entities/entity';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  private url = "https://68a25a8ec5a31eb7bb1cc6a1.mockapi.io";

    constructor(private http:HttpClient) {


    }

    loadUsers(): Observable<User[]> {

      return this.http.get<User[]>(`${this.url}/user`)

    }

    addUser(user:User): Observable<User> {

       return this.http.post<User>(`${this.url}/user`,user)
    }

     editUser(user:User): Observable<User> {

       return this.http.put<User>(`${this.url}/user/${user.id}`,user)

    }

      deleteUser(id:number): Observable<User> {

        return this.http.delete<User>(`${this.url}/user/${id}`)
    }


}
