import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { DataService } from "../../shared/data.service"

@Component({
  selector: 'app-signup-component',
  templateUrl: './signup-component.component.html',
  styleUrls: ['./signup-component.component.css']
})
export class SignupComponentComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private DataService: DataService) { }

  ngOnInit(): void {
  }
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  get f() {
    return this.registerForm.controls
  }

  register() {
    console.log(this.f)
    const data = this.registerForm.value
    console.log(JSON.stringify(this.registerForm.value))
    this.DataService.register(data).subscribe(
      res => {
        console.log(res)
        if (res.message === "Signup successfully") {
          this.router.navigate(['admin/login'])
        } else {
          throw Error;
        }
      },
      error => {
        alert("the email was exist")
      }
    )
  }

}
