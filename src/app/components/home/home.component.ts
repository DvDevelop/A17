import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserInfo } from '../../Shared/dataTypes/auth-info';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];

  ngOnInit(): void {
    let aux: Subscription = this._authsvs.loggedIn$.subscribe(
      loggedIn => {
        this.islogin = loggedIn
      }
    );
    this.subscription.push(aux);
    aux = this._authsvs.userinfo$.subscribe(
      UserInfo => {
        this.userinfo = UserInfo
      }
    )
    this.subscription.push(aux);
  }

  ngOnDestroy(): void {
    for (let sub of this.subscription) {
      sub.unsubscribe()
    }
  }

  private readonly _authsvs = inject(AuthService);
  public islogin: boolean = false;
  public userinfo: UserInfo = {} as UserInfo;
  logout(): void {
    this._authsvs.logOut()
  }
}
