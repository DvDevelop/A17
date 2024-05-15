import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SingUpInfo } from '../../Shared/dataTypes/auth-info';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthApiService } from '../auth-api.service';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.scss'
})
export class SingUpComponent {
  private readonly _authsvs = inject(AuthApiService);
  singupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
  })
  myalert() {
    let info: SingUpInfo = {
      password: '',
      username: '',
      email: '',
      passwordConfirm: ''
    }
    for (let [k, v] of Object.entries(this.singupForm.value)) {
      info[k] = v
    }
    console.log(typeof (info))
    //alert(this.loginForm.value.identity)
    this._authsvs.singUp(info)
    alert("enviado")
  }
}
