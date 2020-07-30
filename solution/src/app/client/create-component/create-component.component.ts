import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from "@angular/forms";
import { Router } from "@angular/router"
import { DataService } from "../../shared/data.service"

@Component({
  selector: 'app-create-component',
  templateUrl: './create-component.component.html',
  styleUrls: ['./create-component.component.css']
})
export class CreateComponentComponent implements OnInit {


  ngOnInit(): void {
  }

  postForm: FormGroup
  file: File
  @ViewChild('ProductImage') Product_Image;

  constructor(private fb: FormBuilder, private router: Router, private DataService: DataService) {

    this.postForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      description: ['', Validators.required],
      manufacturer: ['', Validators.required],
      category: ['', Validators.required],
      condition: ['', Validators.required],
      image: ['', Validators.required]
    })
  }

  get f() {
    return this.postForm.controls
  }



  onSubmit(value) {
    const Image = this.Product_Image.nativeElement;
    if (Image.files && Image.files[0]) {
      this.file = Image.files[0]
    }
    const Image_File: File = this.file;
    console.log(Image_File)

    const formData: FormData = new FormData();
    formData.append('name', value.name)
    formData.append('price', value.price)
    formData.append('stock', value.stock)
    formData.append('description', value.description)
    formData.append('manufacturer', value.manufacturer)
    formData.append('category', value.category)
    formData.append('condition', value.condition)
    formData.append('image', Image_File)


    this.DataService.createProduct(formData).subscribe(
      res => {console.log(res),this.postForm.reset()},
      err => console.log(err)
    )
  }

  goBack() {
    this.DataService.doLogout()
    this.router.navigate(['admin/login'])
  }
}
