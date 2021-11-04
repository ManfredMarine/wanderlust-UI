import { AutosaveService } from './../../shared/services/autosave.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | undefined;
  registerForm: FormGroup | undefined;
  showLogin = true;
  formSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.setLoginForm();
  }

  setLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['abc@123', [Validators.required]],
      password: ['abc', [Validators.required]],
    });
  }

  setRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  showLoginForm() {
    this.formSubmitted = false;
    this.showLogin = true;
    this.registerForm?.reset();
    this.setLoginForm();
  }

  showRegisterForm() {
    this.formSubmitted = false;
    this.showLogin = false;
    this.loginForm?.reset();
    this.setRegisterForm();
  }

  async login() {
    this.formSubmitted = true;
    if (this.loginForm?.valid) {
      const userData = await this.userService.login(this.loginForm?.value);
      this.toastr.success('Logged in successfully');
      this.userService.setUserData(userData);
      this.userService.setUserDataInCache(userData);
      this.router.navigate(['../home'], { relativeTo: this.activatedRoute})
    }
  }

  async register() {
    this.formSubmitted = true;
    if (this.registerForm?.valid) {
      const userRegistered = await this.userService.register(this.registerForm.value);
      this.toastr.success('Registered successfully');
      this.showLoginForm();
    }
  }

}
