import { NgModule } from '@angular/core'; // Importing NgModule to define an Angular module
import { RouterModule, Routes } from '@angular/router'; // Importing RouterModule and Routes to set up application routing
import { AuthGuard } from './core/guards/auth.guard'; // Importing AuthGuard to protect routes
import { AdminGuard } from './core/guards/admin.guard'; // Importing AdminGuard for admin route protection
import { DashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';

// Defining routes for the application
const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirects the empty path to '/home', matching the full path
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, // Lazy loading AuthModule
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] }, // Lazy loading HomeModule with AuthGuard
  { path: 'products', loadChildren: () => import('./product/product.module').then(m => m.ProductsModule), canActivate: [AuthGuard] }, // Lazy loading ProductModule with AuthGuard
  { path: 'categories', loadChildren: () => import('./category/category.module').then(m => m.CategoryModule), canActivate: [AuthGuard] }, // Lazy loading CategoryModule with AuthGuard
  { path: 'blog', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule), canActivate: [AuthGuard] },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] }, // Lazy loading AdminModule with AdminGuard
  { path: '**', redirectTo: 'home' } // Redirects any unknown paths to 'home'
];

@NgModule({
  // Importing RouterModule with the routes defined above
  imports: [RouterModule.forRoot(appRoutes)],

  // Exporting RouterModule to make the routing available throughout the application
  exports: [RouterModule]
})
export class AppRoutesModule { } // Defining the AppRoutesModule that configures the application's routes

// Exporting the routes configuration, making it reusable if needed elsewhere
export const routesConfig: Routes = appRoutes;

