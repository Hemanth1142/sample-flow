import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDetailDialogComponent } from './data-detail-dialog.component';

describe('DataDetailDialogComponent', () => {
  let component: DataDetailDialogComponent;
  let fixture: ComponentFixture<DataDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataDetailDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
