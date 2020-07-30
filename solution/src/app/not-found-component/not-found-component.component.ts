import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-not-found-component',
  template:
    `
    <h2>
      404 - Page not found
    </h2>
    <a (click)="backHome()" class="btn bg-danger mr-1 text-white"><i class="fas fa-arrow-circle-left mr-2"></i>Go Back Home</a>

  `,
  styleUrls: ['./not-found-component.component.css']
})
export class NotFoundComponentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  backHome() {
    this.router.navigate(["/product"])
  }

}
