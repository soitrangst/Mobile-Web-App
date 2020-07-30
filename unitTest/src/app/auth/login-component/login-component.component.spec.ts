import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { CreateComponentComponent } from '../../client/create-component/create-component.component';
import { from, throwError } from 'rxjs';

import { DataService } from '../../shared/data.service';
import { LoginComponentComponent } from './login-component.component';

export const validUser = {
  email: 'admin1@gmail.com',
  password: '123',
};
export const invalidUser = {
  email: 'admin',
  password: '',
};

describe('LoginComponentComponent', () => {
  let component: LoginComponentComponent;
  let fixture: ComponentFixture<LoginComponentComponent>;
  let service: DataService;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponentComponent, CreateComponentComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'admin/post', component: CreateComponentComponent },
        ]),
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [DataService],
    });

    fixture = TestBed.createComponent(LoginComponentComponent);
    component = fixture.componentInstance;
    service = TestBed.get(DataService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  function updateForm(userEmail, userPassword) {
    component.loginForm.controls['email'].setValue(userEmail);
    component.loginForm.controls['password'].setValue(userPassword);
  }

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('component initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.onSubmit()).toBeFalsy();
    expect(component.loginForm.valid).toBeFalsy();
  });

  test('validation of form is valid ', () => {
    updateForm(validUser.email, validUser.password);
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.valid).toBeTruthy();
  });
  test('validation of form is invalid', () => {
    updateForm(invalidUser.email, invalidUser.password);

    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.valid).toBeFalsy();
  });

  test('input into form ', () => {
    updateForm(validUser.email, validUser.password);
    expect(component.loginForm.value).toEqual(validUser);
  });

  test('response when submit login with valid information', () => {
    const response = {
      token: '123abc',
      message: 'The authentication success',
    };
    service.login = jest.fn().mockReturnValue(from([response]));
    jest.spyOn(router, 'navigate');
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalled();
  });
  test('response when submit login with invalid information', () => {
    const response = {
      token: '123abc',
      message: 'The else ',
    };
    service.login = jest.fn().mockReturnValue(from([response]));
    jest.spyOn(router, 'navigate');
    component.onSubmit();
  });
  test('Error response ', (done) => {
    spyOn(window, 'alert');
    spyOn(component.loginForm, 'reset');
    service.login = jest.fn().mockReturnValue(throwError({ status: 404 }));
    component.onSubmit();
    service.login(validUser).subscribe(
      (res) => {},

      (err) => {
        expect(err.status).toBe(404);
        expect(component.loginForm.reset).toHaveBeenCalled();
        expect(component.isRegister).toBe(true);
        expect(window.alert).toHaveBeenCalled();
        done();
      }
    );
  });
});
