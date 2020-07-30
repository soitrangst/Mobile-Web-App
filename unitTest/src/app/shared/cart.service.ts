import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() { }

  items = [];


  addToCart(product) {
    const oldItem = this.items.find(i => i._id === product._id)
    if (oldItem) {
      oldItem.quantity += 1

    } else {
      this.items.push({ ...product, quantity: 1 })
    }
  }

  getItems() {
    return this.items;
  }

  removeItem(item) {
    const product = this.items.find(e => e._id === item._id)
    if (product.quantity < 2) {
      const index = this.items.findIndex(i => i._id == product._id)
      this.items.splice(index, 1)
    } else {
      product.quantity -= 1
    }
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
