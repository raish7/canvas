import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPageSkeletonComponent } from './detail-page-skeleton.component';

describe('DetailPageSkeletonComponent', () => {
  let component: DetailPageSkeletonComponent;
  let fixture: ComponentFixture<DetailPageSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPageSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPageSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
