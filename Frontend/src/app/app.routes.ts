import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home';
import { ProductsComponent } from './pages/products/products';
import { ProductDetailsComponent } from './pages/product-details/product-details';
import { CartComponent } from './pages/cart/cart';
import { LoginComponent } from './pages/login/login';
import { CategoryComponent } from './pages/admin/category/category';
import { BrandComponent } from './pages/admin/brand/brand';
import { ProductComponent } from './pages/admin/product/product';
import { InventoryComponent } from './pages/admin/inventory/inventory';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [

  // 🔐 First page = Login
  { path: '', component: LoginComponent },

  { path: 'home', component: HomeComponent },
  { path: 'products/:brandId', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },

  // Admin
  { path: 'admin/category', component: CategoryComponent },
  { path: 'admin/brand', component: BrandComponent },
  { path: 'admin/product', component: ProductComponent },
  { path: 'admin/inventory', component: InventoryComponent },

  { path: '**', redirectTo: '' }
];