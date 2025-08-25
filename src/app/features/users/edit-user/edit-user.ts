import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../shared/entities/entity';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule, CommonModule, MatIcon],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.scss'
})
export class EditUser implements OnInit {

 userForm!: FormGroup;
  @Output() userEdited = new EventEmitter<User>();
  @Output() noChanges = new EventEmitter<boolean>();
  showPassword: boolean = false;
  private _userEdit!: User;
  user: User = {id: 0, name:'', email:'', password:'', role:'', createdAt:''};
 
  @Input() set userEdit(value: User) {

    if (value) {
      this._userEdit = value;
      this.user = { ...value };

      if (this.userForm) {

        this.loadUserData();

      }

    }
  }

  constructor(private fb: FormBuilder) {

  

  }

loadUserData(): void {

   this.userForm.setValue({
    id: this.user.id,
    name: this.user.name,
    email: this.user.email,
    password: this.user.password,
    role: this.user.role,
  });

}

 ngOnInit(): void {

    this.userForm = this.fb.group({

       id: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
     
    })

    if (this._userEdit) {
      this.loadUserData();
    }
    
  }

  onSubmit() {

  
    this.userEdited.emit(this.userForm.value);


  }

  onReset() {

    this.noChanges.emit(true);

  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

}
