import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ValidationManager } from 'ng2-validation-manager';

import { AuthService } from '../../../shared/services/auth/auth.service';
import { NotieService } from '../../../shared/services/notification/notie.service';

import { ApiHelper } from '../../../shared/helpers/api-helper';
import { FormHelper } from '../../../shared/helpers/form-helper';

@Component({
  selector: 'app-admin-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  form;
  @ViewChild('submit') submit: ElementRef;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.initiateForm();
  }


  onFormSubmit() {
    if (this.form.isValid()) {
      FormHelper.disableButton(this.submit, 'Submitting...');
      this.authService.registerUser(this.form.getData())
        .subscribe(
          (response) => {
            NotieService.success('Successfully Registered');
            FormHelper.enableButton(this.submit, 'Register');
            this.router.navigateByUrl('/user/login');
          },
          (err) => {
            NotieService.error(err.error.message);
            FormHelper.enableButton(this.submit, 'Register');
          }
        );
    }
  }

  private initiateForm() {
    this.form = new ValidationManager({
      'name': 'required',
      'email': 'required|email',
      'password': 'required',
    });
  }

}
