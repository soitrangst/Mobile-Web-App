import { Component, OnInit } from '@angular/core';
import { DataService } from "../../shared/data.service";
import { CartService } from "../../shared/cart.service";

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.css'],
})
export class ProductListComponentComponent implements OnInit {
  listPhones: any[] = []
  cart: number
  constructor(
    private DataService: DataService,
    private CartService: CartService) { }

  ngOnInit(): void {
    this.DataService.getData().subscribe(
      data => this.listPhones = data.data,
      error => console.log(error)
    )
    console.log("Oninting List");
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
