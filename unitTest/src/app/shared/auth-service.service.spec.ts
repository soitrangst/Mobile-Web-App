import { TestBed } from '@angular/core/testing';

import { AuthServiceService } from './auth-service.service';

import { DataService } from "./data.service"
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
describe('AuthServiceService', () => {
  let service: DataService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        DataService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthServiceService,
          multi: true,
        },
      ],

      imports:[HttpClientTestingModule]
    });
    service = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  test('should add an Authorization header', () => {
    service.getData().subscribe(response => {

      expect(response).toBeTruthy();

    });

    const httpRequest = httpMock.expectOne(`${service.apiProducts}`);

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
      // expect(httpRequest.request.headers.get('Authorization')).toBe(
      //   'token YOUR-TOKEN-HERE',
      // );

  });
});
