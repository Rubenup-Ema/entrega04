import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Data, Router } from '@angular/router';
import { ServicesLogin } from '../../shared/services/services.login';
import { Message } from '../../shared/services/message';
import { DataLogin } from './login.entity';
import { RoutePaths } from '../../shared/utils/routes';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login implements OnInit {

    form!: FormGroup;
    procesando = false;
    constructor(private router:Router, private fb: FormBuilder, private _services: ServicesLogin, 
      private snackBar: Message) {

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
          console.log(err);
          this.snackBar.show(`UPS!! ha sucedido lo siguiente: ${err.message}`)}

      })
      sessionStorage.setItem("user","");
      sessionStorage.setItem("role","");
      sessionStorage.setItem("email","");

    }

     onSubmit() {

      this.procesando = true;

      this._services.validarLogin(this.form.get("username")?.value,this.form.get("password")?.value).subscribe({

        next: (data:DataLogin) => {

          sessionStorage.setItem("user", data.name);
          sessionStorage.setItem("role", data.role);
          sessionStorage.setItem("email", data.email);

          this.router.navigate(['/' + RoutePaths.HOME]);

        },
        error: (err) => {
          console.log(err);
          this.procesando = false;
          this.snackBar.show(`UPS!! ha sucedido lo siguiente: ${err.message}`);
        },
        complete: ()=> {console.log('Proceso completado')}

      }
      )
    

    }



}
