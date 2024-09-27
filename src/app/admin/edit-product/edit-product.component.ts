import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product: any = {};

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productService.getProductById(productId).subscribe(data => {
      this.product = data;
    });
  }

  onSubmit() {
    this.productService.updateProduct(this.product).subscribe(() => {
      this.router.navigate(['/dashboard']);
    }, error => {
      console.error('Error updating product:', error);
    });
  }
}
