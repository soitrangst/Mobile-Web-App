import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ProductDetailComponentComponent } from './product-detail-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../shared/data.service';
import { CartService } from '../../shared/cart.service';

describe('ProductDetailComponentComponent', () => {
  let component: ProductDetailComponentComponent;
  let fixture: ComponentFixture<ProductDetailComponentComponent>;
  let service: DataService;
  let cartService: CartService;
  let activatedRoute: ActivatedRoute;
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponentComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [DataService, CartService],
    });
    fixture = TestBed.createComponent(ProductDetailComponentComponent);
    component = fixture.componentInstance;
    service = TestBed.get(DataService);
    activatedRoute = TestBed.get(ActivatedRoute);
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    cartService = TestBed.get(CartService);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('init of component', () => {
    component.ngOnInit();
    expect(component._id).toBeFalsy();
    expect(component.detail).toBeFalsy();
  });

  test('goBack', () => {
    let spyUrl = jest.spyOn(router, 'navigate');
    component.goBack();
    expect(spyUrl).toHaveBeenCalled();
    expect(spyUrl).toHaveBeenCalledWith(['/product']);
  });

  test('check buy', () => {
    let spyBuy = spyOn(cartService, 'addToCart');
    component.buy('');
    expect(spyBuy).toHaveBeenCalled();
  });
});
