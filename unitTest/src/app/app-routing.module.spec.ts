import {Location} from "@angular/common";
import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

import { FormsModule, ReactiveFormsModule  } from "@angular/forms"
import {HeaderListComponent } from "./user/product-list-component/header-list/header-list.component"

import {routes,routingComponent} from "./app-routing.module"
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Router: App', () => {
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
         routingComponent,
         HeaderListComponent,
        ],
      imports:[
        RouterTestingModule.withRoutes(routes),
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [],
    });

    router = TestBed.get(Router); (2)
    location = TestBed.get(Location); (3)
    router.initialNavigation(); (5)
  });

  test('navigate to direct to /cart', fakeAsync(() => { 
    router.navigate(['cart']); 
    tick(); 
    expect(location.path()).toBe('/cart'); 
  }));

  test('navigate to "" redirects you to /product', fakeAsync(() => { 
    router.navigate(['']); 
    tick(); 
    expect(location.path()).toBe('/product'); 
  }));

  test('navigate to "**" redirects you to /**', fakeAsync(() => { 
    router.navigate(['heaven']); 
    tick(); 
    expect(location.path()).toBe('/heaven'); 
  }));

  test('navigate to sub of product product/123 redirects you to /product/123', fakeAsync(() => { 
    router.navigate(['product/123']); 
    tick(); 
    expect(location.path()).toBe('/product/123'); 
  }));

  test('navigate to sub of product admin/login redirects you to /admin/login', fakeAsync(() => { 
    router.navigate(['admin/login']); 
    tick(); 
    expect(location.path()).toBe('/admin/login'); 
  }));

  test('navigate to sub of product admin/signup redirects you to /admin/signup', fakeAsync(() => { 
    router.navigate(['admin/signup']); 
    tick(); 
    expect(location.path()).toBe('/admin/signup'); 
  }));

  test('navigate to sub of product admin/post without permistson redirects you to /admin/login', fakeAsync(() => { 
    router.navigate(['admin/post']); 
    tick(); 
    expect(location.path()).toBe('/admin/login'); 
  }));
});