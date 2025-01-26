import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarSkeletonComponent } from './avatar-skeleton.component';

describe('AvatarSkeletonComponent', () => {
  let component: AvatarSkeletonComponent;
  let fixture: ComponentFixture<AvatarSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
