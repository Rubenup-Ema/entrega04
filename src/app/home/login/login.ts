import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { ServicesLogin } from '../../shared/services/services.login';
import { Message } from '../../shared/services/message';
import { DataLogin } from './login.entity';
import { RoutePaths } from '../../shared/utils/routes';
import { AuthState } from '../../ngrx/auth/auth.model';
import { Store } from '@ngrx/store';
import { login, loginFailure, logout } from '../../ngrx/auth/auth.actions';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

    form!: FormGroup;

    procesando = false;
    constructor(private router:Router, private fb: FormBuilder, 
      private _services: ServicesLogin, 
      private snackBar: Message,
      private store: Store<{auth: AuthState}>
      ) {

         this.form =  this.fb.group({
          username: new FormControl('', [Validators.required,  Validators.email]),
          password: new FormControl('', [Validators.required, Validators.minLength(5)])
      })

    }


    ngOnInit(): void {
      
      this.loadInfo();

    }

    loadInfo() {

      this._services.loadData().subscribe({

        next: ()=>{console.log('data cargada..')},
        error: (err) => {
          
          this.snackBar.show(`UPS!! ha sucedido lo siguiente: ${err.message}`)}

      })
      
      this.store.dispatch(logout({email:'',name:'', admin:'',logged:false}));

    }

     onSubmit() {

      this.procesando = true;

      const {username, password} = this.form.value;

      
       this._services.validarLogin(username, password).subscribe({
        
        
        next: (data:DataLogin) => {
          
          
          
          this.store.dispatch(login({email:data.email, name:data.name,admin:data.role}));
          
          this.router.navigate(['/' + RoutePaths.HOME]);

        },
        error: (err) => {
          
          this.procesando = false;
          this.store.dispatch(loginFailure({error:`UPS!! ha sucedido lo siguiente: ${err.message}`}));
          this.snackBar.show(`UPS!! ha sucedido lo siguiente: ${err.message}`);
        }

      }
      )
    

    }



}
