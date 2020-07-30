import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CreateComponentComponent } from './create-component.component';
import { DataService } from '../../shared/data.service';
import { of, throwError } from 'rxjs';

const validForm = {
  name: 'Xiaomi',
  price: 120,
  stock: 20,
  description: '123',
  manufacturer: 'Xiaomi',
  category: 'Xiaomi',
  condition: 'new',
  image: new File([''], 'filename'),
};

describe('CreateComponentComponent', () => {
  let component: CreateComponentComponent;
  let fixture: ComponentFixture<CreateComponentComponent>;
  let service: DataService;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'admin/login', component: CreateComponentComponent },
        ]),
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [DataService],
      declarations: [CreateComponentComponent],
    });
    fixture = TestBed.createComponent(CreateComponentComponent);
    component = fixture.componentInstance;
    service = TestBed.get(DataService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  // function updateForm(data) {
  //   component.postForm.controls['name'].setValue(data.name);
  //   component.postForm.controls['price'].setValue(data.price);
  //   component.postForm.controls['stock'].setValue(data.stock);
  //   component.postForm.controls['description'].setValue(data.description);
  //   component.postForm.controls['manufacturer'].setValue(data.manufacturer);
  //   component.postForm.controls['category'].setValue(data.category);
  //   component.postForm.controls['condition'].setValue(data.data);
  // }

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('component initial state', () => {
    expect(component.postForm).toBeDefined();
    expect(component.onSubmit('')).toBeFalsy();
    expect(component.postForm.valid).toBeFalsy();
  });

  test('onSubmit with the function is it work?', (done) => {
    const response = {
      message: 'Successfully',
    };
    spyOn(component.postForm, 'reset');
    service.createProduct = jest.fn().mockReturnValue(of({ status: 200 }));
    component.onSubmit(validForm);
    service.createProduct(validForm).subscribe((res) => {
      console.log(res);
      expect(component.postForm.reset).toHaveBeenCalled();
      done();
    });
  });

  test('onSubmit with Error response from service?', (done) => {
    spyOn(window, 'alert');
    service.createProduct = jest
      .fn()
      .mockReturnValue(throwError({ status: 404 }));
    component.onSubmit(validForm);
    service.createProduct(validForm).subscribe(
      (res) => {},
      (err) => {
        expect(err.status).toBe(404);
        expect(window.alert).toHaveBeenCalled();
        done();
      }
    );
  });

  test('event goBack ?', () => {
    let spyUrl = jest.spyOn(router, 'navigate');
    component.goBack();
    expect(spyUrl).toHaveBeenCalled();
  });
});
