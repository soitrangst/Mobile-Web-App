import { Component, OnInit, Input } from '@angular/core';
import { Router } from "@angular/router"

@Component({
  selector: 'app-header-list',
  templateUrl: './header-list.component.html',
  styleUrls: ['./header-list.component.css']
})
export class HeaderListComponent implements OnInit {
  @Input() cart
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goCart() {
    this.router.navigate(['/cart'])
  }
}
