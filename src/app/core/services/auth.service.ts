import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'user1', email: 'user1@example.com', password: 'password123', role: 'user' },
    { username: 'user2', email: 'user2@example.com', password: 'password456', role: 'admin' }
  ];

  constructor() { }

  // دالة للحصول على المستخدم بناءً على اسم المستخدم
  getUserByUsername(username: string, email: string) {
    return this.users.find(u => u.username === username && u.email === email);
  }

  // دالة لتسجيل الدخول
  login(username: string, email: string, password: string): string | null {
    const user = this.users.find(u =>
      u.username === username &&
      u.email === email &&
      u.password === password
    );

    if (user) {
      const token = this.createToken(user); // إنشاء رمز JWT
      localStorage.setItem('token', token); // تخزين الرمز في localStorage
      localStorage.setItem('username', user.username); // تخزين اسم المستخدم

      return token; // إرجاع الرمز
    }
    return null; // إرجاع null إذا لم يتم العثور على المستخدم
  }

  // دالة لإنشاء JWT
  private createToken(user: any): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = {
      username: user.username,
      role: user.role
    };

    // تحويل الرأس والحمولة إلى JSON
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));

    // إنشاء رمز JWT
    return `${encodedHeader}.${encodedPayload}.signature`; // هنا استخدم توقيع حقيقي في التطبيق الفعلي
  }

  // دالة للتحقق مما إذا كان المستخدم مسجلاً الدخول
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // دالة للتحقق مما إذا كان المستخدم إداريًا
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const payload = this.decodeToken(token);
    return payload?.role === 'admin'; // التحقق من دور المستخدم من الحمولة
  }

  // دالة لفك ترميز الـ JWT
  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }

  // دالة لتسجيل الخروج
  logout() {
    localStorage.removeItem('token');
  }
}
