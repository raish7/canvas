import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworksDetailComponent } from './artworks-detail.component';

describe('ArtworksDetailComponent', () => {
  let component: ArtworksDetailComponent;
  let fixture: ComponentFixture<ArtworksDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworksDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtworksDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
