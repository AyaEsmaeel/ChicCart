import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { BlogService } from '../core/services/blog.service';
import { BlogRoutingModule } from './blog-routing.module';
import { FormsModule } from '@angular/forms'; // استيراد FormsModule


@NgModule({
  declarations: [BlogListComponent, PostDetailsComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: BlogListComponent },
      { path: ':id', component: PostDetailsComponent }
    ])
  ],
  providers: [BlogService],
})
export class BlogModule { }

