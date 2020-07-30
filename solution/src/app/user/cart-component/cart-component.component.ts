import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-cart-component',
  templateUrl: './cart-component.component.html',
  styleUrls: ['./cart-component.component.css'],
})
export class CartComponentComponent implements OnInit {
  constructor(private router: Router, private CartService: CartService) { }
  cart: any;
  grandTotal: number;
  ngOnInit(): void {
    this.cart = this.CartService.getItems();
    this.sum()
  }

  sum() {
    if (this.cart) {
      this.grandTotal = this.cart.reduce((a, b) => a += (b.price * b.quantity), 0)
    }
  }

  removeItem(item) {
    this.CartService.removeItem(item);
    this.sum()
  }
  clearAll() {
    this.CartService.clearCart();
    this.ngOnInit()
  }
  backHome() {
    this.router.navigate(['/product']);
  }
}
