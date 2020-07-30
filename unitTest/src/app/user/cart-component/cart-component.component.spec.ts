import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { CartComponentComponent } from './cart-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CartService } from '../../shared/cart.service';
describe('CartComponentComponent', () => {
  let component: CartComponentComponent;
  let fixture: ComponentFixture<CartComponentComponent>;
  let location: Location;
  let router: Router;
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponentComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [CartService],
    });
    fixture = TestBed.createComponent(CartComponentComponent);
    component = fixture.componentInstance;
    location = TestBed.get(Location);
    router = TestBed.get(Router);
    service = TestBed.get(CartService);
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Init of component', () => {
    spyOn(component, 'sum');
    component.ngOnInit();
    expect(component.cart).toBeDefined();
    expect(component.sum).toHaveBeenCalled();
  });

  test('navigation with backHome', () => {
    let spyUrl = jest.spyOn(router, 'navigate');
    component.backHome();
    expect(spyUrl).toHaveBeenCalled();
    expect(spyUrl).toHaveBeenCalledWith(['/product']);
  });

  test('clear Cart', () => {
    let spyClear = spyOn(service, 'clearCart');
    component.clearAll();
    expect(spyClear).toHaveBeenCalled();
  });
  test('removeItem ', () => {
    let spyRemove = spyOn(service, 'removeItem');
    component.removeItem('');
    expect(spyRemove).toHaveBeenCalled();
  });

  test('sum method', () => {
    const fakeData = [{ id: 1, quantity: 2, price: 3 }];
    component.cart = fakeData;
    component.sum();
    expect(component.grandTotal).toBe(6);
  });
});
