import { ToastrService } from 'ngx-toastr';
import { IUser } from './../../../shared/interfaces/user.interface';
import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  username: string | undefined;
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.userService.userData$?.subscribe((userData: IUser | null) => {
      this.username = userData?.firstName;
    })
  }

  ngOnInit(): void {
  }

  async logout() {
    this.userService.logout();
    this.toastr.success('Logged out successfully');
    await this.userService.removeUserDataFromCache();
    this.router.navigateByUrl('/login')
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  showBookings() {
    this.router.navigate(['bookings']);
  }

}
