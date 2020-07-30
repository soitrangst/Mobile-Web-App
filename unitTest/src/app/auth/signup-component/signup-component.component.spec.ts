import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { from, throwError } from 'rxjs';
import { DataService } from '../../shared/data.service';
import { SignupComponentComponent } from './signup-component.component';

export const validUser = {
  email: 'admin1@gmail.com',
  password: '123',
};
export const invalidUser = {
  email: 'admin',
  password: '',
};

describe('SignupComponentComponent', () => {
  let component: SignupComponentComponent;
  let fixture: ComponentFixture<SignupComponentComponent>;
  let location: Location;
  let router: Router;
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponentComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'admin/login', component: SignupComponentComponent },
        ]),
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
      providers: [DataService],
    });

    fixture = TestBed.createComponent(SignupComponentComponent);
    component = fixture.componentInstance;
    service = TestBed.get(DataService);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function updateForm(userEmail, userPassword) {
    component.registerForm.controls['email'].setValue(userEmail);
    component.registerForm.controls['password'].setValue(userPassword);
  }

  test('component initial state', () => {
    expect(component.registerForm).toBeDefined();
    expect(component.register()).toBeFalsy();
    expect(component.registerForm.valid).toBeFalsy();
  });

  test('validation of form is valid ', () => {
    updateForm(validUser.email, validUser.password);
    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.valid).toBeTruthy();
  });
  test('validation of form is invalid', () => {
    updateForm(invalidUser.email, invalidUser.password);

    expect(component.registerForm).toBeDefined();
    expect(component.registerForm.valid).toBeFalsy();
  });

  test('input into form ', () => {
    updateForm(validUser.email, validUser.password);
    expect(component.registerForm.value).toEqual(validUser);
  });
  test('response when submit register with valid information', () => {
    const response = {
      token: '123abc',
      message: 'Signup successfully',
    };
    service.register = jest.fn().mockReturnValue(from([response]));
    jest.spyOn(router, 'navigate');
    component.register();
    expect(router.navigate).toHaveBeenCalled();
  });
  test('response when submit register with valid information', () => {
    const response = {
      token: '123abc',
      message: 'Signup',
    };
    service.register = jest.fn().mockReturnValue(from([response]));
    component.register();
  });
  test('Error response ', fakeAsync(() => {
    spyOn(window, 'alert');
    service.register = jest.fn().mockReturnValue(throwError({ status: 404 }));
    component.register();
    expect(window.alert).toHaveBeenCalled();
  }));
});
