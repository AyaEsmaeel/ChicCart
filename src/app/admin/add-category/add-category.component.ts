import { Component } from '@angular/core';
import { CategoryService } from '../../core/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {
  category = {
    name: ''
  };

  constructor(private categoryService: CategoryService, private router: Router) { }

  onSubmit() {
    this.categoryService.addCategory(this.category).subscribe(() => {
      // إعادة التوجيه إلى لوحة التحكم بعد إضافة الفئة
      this.router.navigate(['/admin/dashboard']);
    });
  }
}
