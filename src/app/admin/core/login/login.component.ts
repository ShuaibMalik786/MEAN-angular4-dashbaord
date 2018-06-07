import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ValidationManager } from 'ng2-validation-manager';

import { AuthService } from '../../../shared/services/auth/auth.service';
import { NotieService } from '../../../shared/services/notification/notie.service';

import { ApiHelper } from '../../../shared/helpers/api-helper';
import { FormHelper } from '../../../shared/helpers/form-helper';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  LoginForm;
  @ViewChild('submit') submit: ElementRef;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.initiateForm();
  }


  onFormSubmit() {
    if (this.LoginForm.isValid()) {
      FormHelper.disableButton(this.submit, 'Logging in...');
      this.authService.loginAdmin(this.LoginForm.getData())
        .subscribe(
          (response) => {
            localStorage.setItem('token', response.token)
            NotieService.success('Successfully logged in');
            FormHelper.enableButton(this.submit, 'Login');
            this.router.navigateByUrl('/admin');
          },
          (err) => {
            NotieService.error(err.error.message);
            FormHelper.enableButton(this.submit, 'Login');
          }
        );
    }
  }

  private initiateForm() {
    this.LoginForm = new ValidationManager({
      'email': 'required|email',
      'password': 'required',
    });
  }

}
