import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponentComponent } from './not-found-component.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotFoundComponentComponent', () => {
  let component: NotFoundComponentComponent;
  let fixture: ComponentFixture<NotFoundComponentComponent>;



  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,

      ],
      declarations: [NotFoundComponentComponent]
    })
    fixture = TestBed.createComponent(NotFoundComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
