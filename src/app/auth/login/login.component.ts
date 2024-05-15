import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthInfo } from '../../Shared/dataTypes/auth-info';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthApiService } from '../auth-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly _authsvs = inject(AuthApiService);

  loginForm = new FormGroup({
    identity: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  myalert() {
    let info: AuthInfo = {
      identity: '',
      password: ''
    }
    for (let [k, v] of Object.entries(this.loginForm.value)) {
      info[k] = v
    }
    //alert(this.loginForm.value.identity)
    this._authsvs.askforLogin(info);
    alert("enviado")
  }
}
