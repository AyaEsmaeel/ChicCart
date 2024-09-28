import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = ''; // متغير لتخزين رسالة الخطأ العامة
  usernameError: string = ''; // متغير لتخزين رسالة الخطأ لاسم المستخدم
  emailError: string = ''; // متغير لتخزين رسالة الخطأ للبريد الإلكتروني
  passwordError: string = ''; // متغير لتخزين رسالة الخطأ لكلمة المرور

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    // إعادة ضبط رسائل الخطأ
    this.loginError = '';
    this.usernameError = '';
    this.emailError = '';
    this.passwordError = '';

    if (this.loginForm.valid) {
      const { username, email, password } = this.loginForm.value;

      // تحقق من وجود المستخدم باستخدام اسم المستخدم والبريد الإلكتروني
      const user = this.authService.getUserByUsername(username, email);

      if (user) {
        // تحقق مما إذا كانت كلمة المرور صحيحة
        if (user.password === password) {
          // تسجيل الدخول ناجح
          localStorage.setItem('user', user.username);
          localStorage.setItem('role', user.role);

          // توجيه المستخدم بناءً على الدور
          if (user.role === 'admin') {
            this.router.navigate(['/dashboard']); // توجيه الإداري إلى لوحة التحكم
          } else {
            this.router.navigate(['/home']); // توجيه المستخدم العادي إلى الصفحة الرئيسية
          }

          console.log(`Hello ${user.role}`);
        } else {
          // إذا كانت كلمة المرور غير صحيحة
          this.passwordError = 'كلمة المرور غير صحيحة';
        }
      } else {
        // إذا كان اسم المستخدم أو البريد الإلكتروني غير صحيح
        this.usernameError = 'اسم المستخدم أو البريد الإلكتروني غير صحيح';
      }
    } else {
      // عرض رسائل الخطأ المناسبة لكل حقل
      if (this.loginForm.get('username')?.invalid) {
        this.usernameError = 'يرجى إدخال اسم مستخدم صالح';
      }
      if (this.loginForm.get('email')?.invalid) {
        this.emailError = 'يرجى إدخال بريد إلكتروني صالح';
      }
      if (this.loginForm.get('password')?.invalid) {
        this.passwordError = 'يرجى إدخال كلمة مرور صالحة';
      }
    }
  }
}
