import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Login, Logout } from '@coord-angular/auth';
import { AuthState } from '@coord-angular/auth';

@Component({
  selector: 'ngx-home-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Select(AuthState.isLoggedIn) isLoggedIn$: Observable<boolean>;

  navigation = [
    { link: 'about', label: 'About' },
    { link: 'blog', label: 'Blog' },
    { link: 'features', label: 'Features' }
  ];

  constructor(private store: Store) {}

  ngOnInit() {}

  public login() {
    this.store.dispatch(new Login());
  }

  public logout() {
    this.store.dispatch(new Logout());
  }

  public signup() {}
}
