import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[CartService]
    });
    service = TestBed.inject(CartService);
  });

  test('initialize of cart', () => {
    expect(service.items.length).toBe(0);
  });

  test('add product to cart', () => {
    const item = {
      id:1,
      quantity:1
    }
    service.addToCart(item)
    expect(service.items.length).toBe(1);
  });

  test('add product to checking quantity', () => {
    const item = {
      id:1,
      quantity:1
    }
    service.addToCart(item)
    service.addToCart(item)
    expect(service.items.length).toBe(1);
  });

  test('add product to checking quantity with different items', () => {
    const item = {
      _id:1,
      quantity:1
    }
    const item2 = {
      _id:2,
      quantity:1
    }
    service.addToCart(item)
    service.addToCart(item2)
    expect(service.items.length).toBe(2);
  });

  test('getItems product', () => {
    const item = {
      _id:1,
      quantity:1
    }
    const item2 = {
      _id:2,
      quantity:1
    }
    service.addToCart(item)
    service.addToCart(item2)
    expect(service.getItems().length).toBe(2);
  });

  test('remove product', () => {
    const item = {
      _id:1,
      quantity:1
    }
    const item2 = {
      _id:2,
      quantity:1
    }
    service.addToCart(item)
    service.addToCart(item)
    service.addToCart(item2)
    service.removeItem(item)
    expect(service.items[0].quantity).toBe(1);
  });

  test('clear cart', () => {
    const item = {
      _id:1,
      quantity:1
    }
    const item2 = {
      _id:2,
      quantity:1
    }
    service.addToCart(item)
    service.addToCart(item)
    service.addToCart(item2)
    service.clearCart()
    expect(service.items.length).toBe(0);
  });
});
