import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { MyGuardGuard } from './my-guard.guard';
import { DataService } from '../shared/data.service';

import { Router } from '@angular/router';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MyGuardGuard', () => {
  let guard: MyGuardGuard;
  let injector: TestBed;
  let authService: DataService;
  let routeMock: any = { snapshot: {} };
  let routeStateMock: any = { snapshot: {}, url: '/cookies' };
  let routerMock = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [MyGuardGuard, { provide: Router, useValue: routerMock }],
    });
    injector = getTestBed();
    authService = injector.get(DataService);
    guard = injector.get(MyGuardGuard);
  });

  test('should create', () => {
    expect(guard).toBeTruthy();
  });

  test('should redirect an unauthenticated user to the login route', () => {
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(false);
    expect(routerMock.navigate).toHaveBeenCalledWith(['admin/login']);
  });

  test('should allow the authenticated user to access app', () => {
    spyOn(authService, 'isLogin').and.returnValue(true);
    expect(guard.canActivate(routeMock, routeStateMock)).toEqual(true);
  });
});
