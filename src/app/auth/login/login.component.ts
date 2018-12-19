import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UiService } from 'src/app/services/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private uiService: UiService, private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  // Submitting Login Form
  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    } else {
      // Showing Alert Message when Email Field not Valid
      if (this.loginForm.controls.email.invalid) {
        this.uiService.showSnackbar(
          'Please provide a valid email address',
          null,
          3000,
          'panel_danger'
        );
        return;
      }

      // Showing Alert Message when the Form not valid
      this.uiService.showSnackbar(
        'Please fill the required fields',
        null,
        3000,
        'panel_danger'
      );
    }
  }
}
