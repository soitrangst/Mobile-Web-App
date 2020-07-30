import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"

import { DataService } from "./shared/data.service";
import { CartService } from "./shared/cart.service"
import { AuthServiceService } from "./shared/auth-service.service"
import { MyGuardGuard } from "./auth/my-guard.guard"

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderListComponent } from './user/product-list-component/header-list/header-list.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    HeaderListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    DataService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthServiceService,
      multi: true
    },
    MyGuardGuard,
    CartService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
