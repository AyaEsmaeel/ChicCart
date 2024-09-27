import { Component } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  product = {
    name: '',
    description: '',
    price: 0
  };

  constructor(private productService: ProductService, private router: Router) { }

  onSubmit() {
    this.productService.addProduct(this.product).subscribe(() => {
      // إعادة التوجيه إلى لوحة التحكم بعد إضافة المنتج
      this.router.navigate(['/admin/dashboard']);
    });
  }
}
