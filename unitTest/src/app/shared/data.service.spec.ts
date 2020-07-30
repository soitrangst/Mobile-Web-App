import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DataService } from './data.service';
import { doesNotReject } from 'assert';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(DataService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('test method POST product', fakeAsync(() => {
    service.createProduct({ topicId: 1 }).subscribe((courseData) => {
      expect(courseData).toEqual({ topicId: 1 });
      tick();
    });
    const req = httpTestingController.expectOne(service.apiProducts);
    expect(req.request.method).toEqual('POST');
  }));

  test('test method GET product', (done) => {
    const mockCourse = {
      name: 'Chessable',
      description: 'Space repetition to learn chess, backed by science',
    };
    service.getData().subscribe((courseData) => {
      expect(courseData.name).toEqual('Chessable');
      done();
    });
    const req = httpTestingController.expectOne(service.apiProducts);
    req.flush(mockCourse);
    expect(req.request.method).toEqual('GET');
  });

  test('test method POST login', fakeAsync(() => {
    const fakeRsponse = {
      token: '1234',
    };
    service.login('').subscribe((res) => {
      expect(res).toEqual(fakeRsponse);
      tick();
    });

    let spyGoLogin = spyOn(service, 'goLogin');
    const req = httpTestingController.expectOne(service.apiLogin);
    req.flush(fakeRsponse);
    expect(req.request.method).toEqual('POST');
    expect(spyGoLogin).toHaveBeenCalled();
    expect(service.isLogin).toBe(true);
  }));

  test('goLogin to have call?', () => {
    service.goLogin('123');
    expect(localStorage.getItem(service.JWT_TOKEN)).toBeTruthy();
  });
});
