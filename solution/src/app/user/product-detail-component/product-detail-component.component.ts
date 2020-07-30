import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { DataService } from "../../shared/data.service";
import { CartService } from "../../shared/cart.service"

@Component({
  selector: 'app-product-detail-component',
  templateUrl: './product-detail-component.component.html',
  styleUrls: ['./product-detail-component.component.css']
})
export class ProductDetailComponentComponent implements OnInit {

  constructor(
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private CartService: CartService
  ) { }

  detail;
  _id: string;


  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(doc => {
      this._id = doc.get('id');
      console.log(doc);
      this.CartService._listPhones.subscribe(
        data => this.detail = data.find(e => e._id === this._id),
        error => console.log(error));
    })


  }
  goBack() {
    this.router.navigate(["/product"])
  }
  buy(phone) {
    this.CartService.addToCart(phone)
  }


}
