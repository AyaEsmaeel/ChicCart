import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // استيراد Router للتوجيه
import { BlogService } from '../../core/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  posts: any[] = [];

  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
    this.blogService.getPosts().subscribe(data => {
      this.posts = data.posts; // تعديل حسب هيكل البيانات
    });
  }

  // دالة التوجيه إلى صفحة التفاصيل
  viewDetails(postId: number) {
    this.router.navigate(['/blog', postId]); // توجيه المستخدم إلى صفحة التفاصيل بناءً على ID
  }
}

