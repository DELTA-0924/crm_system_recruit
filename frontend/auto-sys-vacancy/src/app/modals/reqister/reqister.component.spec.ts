import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqisterComponent } from './reqister.component';

describe('ReqisterComponent', () => {
  let component: ReqisterComponent;
  let fixture: ComponentFixture<ReqisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReqisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReqisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
