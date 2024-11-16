import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedArtworksComponent } from './featured-artworks.component';

describe('FeaturedArtworksComponent', () => {
  let component: FeaturedArtworksComponent;
  let fixture: ComponentFixture<FeaturedArtworksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedArtworksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedArtworksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
