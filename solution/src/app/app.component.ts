import { Component } from '@angular/core';
import { CartService } from "./shared/cart.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private CartService: CartService) { }

  ngOnInit(): void {

    this.CartService.getData()

  }


}
