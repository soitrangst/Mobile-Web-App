import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { DataService } from "../../shared/data.service";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, public DataService: DataService) { }

  ngOnInit(): void {
  }
  isRegister: boolean = false
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  get f() {
    return this.loginForm.controls
  }

  onSubmit() {
    console.log(this.f)
    console.log(this.loginForm.value)
    this.DataService.login(this.loginForm.value).subscribe(
      res => {
        if (res.message === "The authentication success") {
          this.router.navigate(['admin/post'])
        } else {
          throw Error;
        }

      },
      error => {
        alert(`Authentication failed \n${error}`)
        this.loginForm.reset()
        this.isRegister = true

      }
    )
  }

}
