import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponentComponent } from './product-list-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderListComponent } from './header-list/header-list.component';
import { DataService } from '../../shared/data.service';
import { CartService } from '../../shared/cart.service';

import { of } from 'rxjs';

describe('ProductListComponentComponent', () => {
  let component: ProductListComponentComponent;
  let fixture: ComponentFixture<ProductListComponentComponent>;
  let dataService: DataService;
  let cartService: CartService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [DataService, CartService],
      declarations: [ProductListComponentComponent, HeaderListComponent],
    });

    fixture = TestBed.createComponent(ProductListComponentComponent);
    component = fixture.componentInstance;
    dataService = TestBed.get(DataService);
    cartService = TestBed.get(CartService);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('init component', (done) => {
    component.ngOnInit();
    dataService.getData = jest.fn().mockReturnValue(of({ data: 123 }));
    dataService.getData().subscribe((res) => {
      expect(res.data).toBe(123);
      done();
    });
  });

  test('checkCart', () => {
    const fakeData = [{ id: 1, quantity: 2, price: 3 }];
    cartService.items = fakeData;
    component.checkCart();
    expect(component.cart).toBe(2);
  });

  test('buy function', () => {
    let spyCartService = spyOn(cartService, 'addToCart');
    component.buy('');
    expect(spyCartService).toHaveBeenCalled();
  });
});
