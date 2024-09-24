import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      // Authentication logic can be added here
      localStorage.setItem('user', username); // Store username
      this.router.navigate(['/home']); // Navigate to home page
    } else {
      // Handle form validation failure (e.g., show an error message)
    }
  }
}


