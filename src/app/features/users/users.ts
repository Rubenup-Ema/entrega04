import { Component } from '@angular/core';
import { UsersService } from './users-service';
import { MatDialog } from '@angular/material/dialog';
import { Message } from '../../shared/services/message';
import { User } from '../../shared/entities/entity';
import { ConfirmDialog } from '../../shared/utils/confirm-dialog/confirm-dialog';
import { UsersTable } from './users-table/users-table';
import { EditUser } from './edit-user/edit-user';
import { AddUser } from './add-user/add-user';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-users',
  imports: [UsersTable, EditUser, AddUser, CommonModule, MatIcon],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {

  editUser!: User;
  users: User[] = [];
  formVisible: boolean[] = [false,false,false]; // [list, add, edit]


  constructor(private _servicios: UsersService, private dialog: MatDialog, private snackBar:Message) {



  }

  ngOnInit(): void {
    
    
     this.loadUsers();
     this.formVisible[0] = true;

  }

  loadUsers() {

    this._servicios.loadUsers().subscribe({

      next: (response)=> {

              this.users = response;
              this.noChangeNewUser(true);

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

  newUser() {

    this.formVisible = [false,true,false];

  }

  noChangeNewUser(value: boolean) {

    this.formVisible = [value,false,false];


  }

  addUser(user: User) {

    this._servicios.addUser(user).subscribe({

        next:(response:User) => {

        if (response) {
            this.snackBar.show('REGISTERED User!!!');
          this.loadUsers();
          
          } 
          this.noChangeNewUser(true);
      }
      ,
      error: (err) =>{

         this.snackBar.show(err.message);

      }
      }
    )


  }

  editedUser(userEdit: User) {

    this._servicios.editUser(userEdit).subscribe({

      next:(response:User) => {

        if (response) {
          this.snackBar.show('UPDATED User!!!');
          const index = this.users.findIndex(user => user.id === userEdit.id);

  
          if (index !== -1) {

          this.users[index] = {...userEdit};
          this.users = [...this.users];
          
          } 
          this.noChangeEditUser(true);
      }
      },
      error: (err) =>{

         this.snackBar.show(err.message);

      }
      }
    )


  }

  onEdit(userEdit: User) {

    
    this.editUser = userEdit;   
    this.formVisible = [false,false,true]

  }

  noChangeEditUser(value: boolean) {

    this.formVisible = [value,false,false];


  }

   onDelete(userDelete: User) {
  
      const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '450px',
      height: '250px',
      data: { mensaje: '¿Estás seguro de eliminar el usuario ' + userDelete.name + '?' }
    });
  
    dialogRef.afterClosed().subscribe(resultado => {
      if (resultado) {
        this._servicios.deleteUser(userDelete.id).subscribe(
          
          {

            next: (value: User)=> {
              
              if(value) {

                  this.users = this.users.filter(user => user.id !== userDelete.id);
                
               
                this.snackBar.show('DELETED User!!!');

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
