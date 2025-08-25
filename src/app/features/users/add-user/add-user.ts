import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../shared/entities/entity';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-user',
  imports: [ReactiveFormsModule, CommonModule, 
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss'
})
export class AddUser implements OnInit {

 userForm!: FormGroup;
  @Output() userAdded = new EventEmitter<User>();
  @Output() noChanges = new EventEmitter<boolean>();
  
  showPassword: boolean = false;


  constructor(private fb: FormBuilder) {

  

  }

 ngOnInit(): void {

    this.userForm = this.fb.group({

      id: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
    })
    
  }

  onSubmit() {


    this.userAdded.emit(this.userForm.value);


  }

  onReset() {

    this.userForm.reset();
    this.noChanges.emit(true);

  }

 
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
