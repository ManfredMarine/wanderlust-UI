import { Router } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { AutosaveService } from './shared/services/autosave.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Wanderlust';

  constructor(
    private autosave: AutosaveService,
    private userService: UserService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    const userData = await this.autosave.getUserData();
    if (userData) {
      this.userService.setUserData(userData);
      this.router.navigate(['/home']);
    }
  }
}
