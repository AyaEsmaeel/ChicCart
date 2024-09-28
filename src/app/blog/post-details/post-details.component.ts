import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';
import { CommentService } from '../../core/services/comment.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  post: any; // Store post data
  comments: any[] = []; // Store comments
  postId!: number;
  newComment: string = ''; // Store new comment

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    // Get post ID from route
    this.postId = +this.route.snapshot.paramMap.get('id')!;
    this.loadPostDetails();
    this.loadComments();
  }

  // Method to load post details
  loadPostDetails(): void {
    this.blogService.getPostById(this.postId).subscribe(
      (data) => {
        this.post = data; // Ensure the structure matches your API
      },
      (error) => {
        console.error('Error fetching post details:', error);
      }
    );
  }

  // Method to load comments related to the post
  loadComments(): void {
    this.commentService.getComments(this.postId).subscribe(
      (data) => {
        this.comments = data.comments; // Ensure this matches the response structure
        // If you want to limit to the first 5 comments
        this.comments = this.comments.slice(0, 5);
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }

  // Method to like the post
  likePost(): void {
    this.post.reactions.likes++;
    // Here, call your API to update the like count
    this.blogService.likePost(this.postId).subscribe(
      () => { },
      (error) => {
        console.error('Error liking the post:', error);
      }
    );
  }

  // Method to dislike the post
  dislikePost(): void {
    this.post.reactions.dislikes++;
    // Here, call your API to update the dislike count
    this.blogService.dislikePost(this.postId).subscribe(
      () => { },
      (error) => {
        console.error('Error disliking the post:', error);
      }
    );
  }

  // Method to add a new comment
  addComment(): void {
    if (this.newComment.trim()) {
      const comment = {
        body: this.newComment,
        user: { fullName: 'Current User', username: 'current_user' } // استبدلها ببيانات المستخدم الحقيقية
      };
      this.comments.push(comment); // إضافة التعليق محليًا
      this.newComment = ''; // مسح حقل الإدخال
      // قم بإضافة تعليق باستخدام API
      this.commentService.addComment(this.postId, comment).subscribe(
        () => {
          // يمكنك إضافة كود هنا عند نجاح العملية
        },
        (error) => {
          console.error('Error adding comment:', error);
        }
      );
    }
  }
}






