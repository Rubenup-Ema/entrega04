import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../shared/entities/entity';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MaskPipe } from '../../../shared/pipe/mask-pipe-pipe'

@Component({
  selector: 'app-users-table',
  imports: [MatTableModule,  MatIconModule, MaskPipe],
  templateUrl: './users-table.html',
  styleUrl: './users-table.scss'
})
export class UsersTable {

  @Input() users: User[] = [];
  @Output() UserEdit= new EventEmitter<User>();
  @Output() UserDelete= new EventEmitter<User>();

  displayedColumns: string[] = ['id', 'name', 'email' ,'password','role', 'acciones']
  role = '';
  constructor() {


  }

  ngOnInit(): void {
    
    this.role = sessionStorage.getItem("role") || '';

  }

 
  onDelete(User: User){

    this.UserDelete.emit(User);

  }

  onEdit(User: User){

  
    let editUser!: User;

    editUser = User ;

    this.UserEdit.emit(editUser);

  }


}
