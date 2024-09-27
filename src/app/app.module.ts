import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutesModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { ProductsModule } from './product/product.module'; 
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { FormsModule } from '@angular/forms'; // استيراد FormsModule

// استيراد الخدمات
import { ProductService } from './core/services/product.service';
import { CategoryService } from './core/services/category.service';
import { BlogService } from './core/services/blog.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent // إعلان المكونات الخاصة فقط بالـ AppModule
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    ReactiveFormsModule,
    HomeModule,
    FormsModule,
    AuthModule,
    ProductsModule // استيراد وحدات المنتجات
  ],
  providers: [
    ProductService,
    CategoryService,
    BlogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


