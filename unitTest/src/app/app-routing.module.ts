import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyGuardGuard } from "./auth/my-guard.guard"

import { LoginComponentComponent } from './auth/login-component/login-component.component';
import { SignupComponentComponent } from './auth/signup-component/signup-component.component';
import { CreateComponentComponent } from './client/create-component/create-component.component';

import { ProductListComponentComponent } from './user/product-list-component/product-list-component.component';
import { ProductDetailComponentComponent } from './user/product-detail-component/product-detail-component.component';
import { CartComponentComponent } from './user/cart-component/cart-component.component';
import { NotFoundComponentComponent } from './not-found-component/not-found-component.component';

export const routes: Routes = [
  { path: '', redirectTo: '/product', pathMatch: 'full' },
  { path: 'cart', component: CartComponentComponent },
  { path: 'admin/login', component: LoginComponentComponent },
  { path: 'admin/signup', component: SignupComponentComponent },
  { path: 'admin/post', component: CreateComponentComponent, canActivate: [MyGuardGuard] },
  {
    path: 'product',
    component: ProductListComponentComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponentComponent,
  },
  {
    path: '**',
    component: NotFoundComponentComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponent = [
  CartComponentComponent,
  LoginComponentComponent,
  CreateComponentComponent,
  ProductListComponentComponent,
  ProductDetailComponentComponent,
  NotFoundComponentComponent,
  SignupComponentComponent,
];
