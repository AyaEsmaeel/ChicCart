import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';

const routes: Routes = [
  { path: 'add-product', component: AddProductComponent },
  { path: 'add-category', component: AddCategoryComponent },
  { path: 'admin-dashboard', component: DashboardComponent },
  { path: 'admin-dashboard/edit-product/:id', component: EditProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
