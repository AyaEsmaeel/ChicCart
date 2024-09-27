import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ProductService } from '../../core/services/product.service';
import { CategoryService } from '../../core/services/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  isAdmin: boolean = false;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data.products;
    });
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.loadProducts(); // إعادة تحميل المنتجات بعد الحذف
    });
  }
  navigateToEditProduct(productId: number) {
    this.router.navigate(['/admin/edit-product', productId]);
  }
  navigateToAddProduct() {
    this.router.navigate(['/admin/add-product']);
  }

  navigateToAddCategory() {
    this.router.navigate(['/admin/add-category']);
  }

}
