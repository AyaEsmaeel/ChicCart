import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent,
    EditProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: DashboardComponent },
      { path: 'edit-product/:id', component: EditProductComponent },
    ]),
    FormsModule
  ],
  exports: [
    DashboardComponent,
  ]
})
export class AdminModule { }

