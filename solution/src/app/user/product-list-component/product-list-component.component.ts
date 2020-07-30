import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from "../../shared/cart.service";

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css'],
})
export class ProductListComponentComponent implements OnInit {
  listPhones: any[] = []
  cart: number
  constructor(private router: Router,
    private CartService: CartService) { }

  ngOnInit(): void {
    this.CartService._listPhones.subscribe(
      data => this.listPhones = data,
      error => alert(error)
    )
    this.checkCart()
  }

  checkCart() {
    this.cart = this.CartService.items.reduce((a, b) => a += b.quantity, 0)
  }


  buy(product) {
    this.CartService.addToCart(product)
    this.checkCart()
  }

}
