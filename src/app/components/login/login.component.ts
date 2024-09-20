import { Component, inject } from '@angular/core';
import { LoginService } from 'src/app/login-service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string  = "";
  error :string = "";
  constructor(private ls: LoginService) {}

  async login() {
    this.error= "";
    await this.ls.loginService(this.email,this.password).then((data) =>{
      this.error = data;
    })
    //TODO:Dar formato al error.
    console.log(this.error);
  }
}
