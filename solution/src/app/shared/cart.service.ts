import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  items = [];

  _listPhones = new BehaviorSubject([]);

  readonly listPhone = this._listPhones.asObservable();

  private apiProducts: string = 'http://192.168.1.6:8800/products';
  getData() {
    this.httpClient.get<any>(this.apiProducts).subscribe(
      (res) => this._listPhones.next([...res.data]),
      (err) => throwError('can not load data')
    );
  }

  addToCart(product) {
    const newProduct = this._listPhones.value.find(
      (i) => i._id === product._id
    );
    if (newProduct.stock > 0) {
      newProduct.stock -= 1;
      const oldItem = this.items.find((i) => i._id === product._id);
      if (oldItem) {
        oldItem.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    }
  }

  getItems() {
    return this.items;
  }

  removeItem(item) {
    const product = this.items.find((e) => e._id === item._id);
    if (product.quantity < 2) {
      const index = this.items.findIndex((i) => i._id == product._id);
      this.items.splice(index, 1);
      this.backToStock(item);
    } else {
      product.quantity -= 1;
      this.backToStock(item);
    }
  }

  clearCart() {
    this.items = [];
    this.getData();
  }

  backToStock(item) {
    const newProduct = this._listPhones.value.find((i) => i._id === item._id);
    newProduct.stock += 1;
  }
}
