import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // يجعل الخدمة متاحة في كل المشروع بدون الحاجة لإضافتها في المودول
})
export class BlogService {
  private apiUrl = 'https://dummyjson.com/posts'; // عنوان API للمدونات

  constructor(private http: HttpClient) { }

  // دالة لجلب كل المدونات
  getPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // دالة لجلب تفاصيل المدونة باستخدام ID المدونة
  getPostById(id: string | number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  likePost(postId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}/like`, {}); // Assuming you have an endpoint for liking a post
  }

  dislikePost(postId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}/dislike`, {}); // Assuming you have an endpoint for disliking a post
  }
  // دالة لجلب التعليقات المتعلقة بمدونة معينة
  getCommentsByPostId(postId: string | number): Observable<any> {
    return this.http.get(`https://dummyjson.com/posts/${postId}/comments`); // API للتعليقات
  }

  // دوال أخرى لإنشاء، تعديل، وحذف المدونات إذا كانت مطلوبة للوحة الإدارة
  createPost(postData: any): Observable<any> {
    return this.http.post(this.apiUrl, postData);
  }

  updatePost(id: string | number, postData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, postData);
  }

  deletePost(id: string | number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  incrementViews(postId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${postId}/increment-views`, {});
  }
}
