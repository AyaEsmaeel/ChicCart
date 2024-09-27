import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'https://dummyjson.com/comments';

  constructor(private http: HttpClient) { }

  // Method to get comments for a specific post
  getComments(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/post/${postId}`);
  }

  // Method to add a new comment to a specific post
  addComment(postId: number, comment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/post/${postId}`, comment);
  }

  // Method to delete a comment by its ID
  deleteComment(commentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${commentId}`);
  }

  // Method to update a comment by its ID
  updateComment(commentId: number, comment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${commentId}`, comment);
  }
}
