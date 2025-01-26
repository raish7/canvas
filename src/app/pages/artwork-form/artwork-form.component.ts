import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ArtworksService } from '../../services/artworks/artworks.service';
import { toastMixin } from '../../utils/toastMixin';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { LlamaService } from '../../services/llama/llama.service';

@Component({
  selector: 'app-artwork-form',
  standalone: true,
  imports: [NgxDropzoneModule, NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './artwork-form.component.html',
  styleUrl: './artwork-form.component.scss',
})
export class ArtworkFormComponent {
  files: File[] = [];
  categories: any[] = [];
  selectedCategory = '';
  artworkForm!: FormGroup;
  newImageIds: number[] = [];
  categoryIds: number[] = [];
  artistId = null;
  isSubmitting = false;

  constructor(
    private artworkService: ArtworksService,
    private fb: FormBuilder,
    private router: Router,
    private llamaService: LlamaService
  ) {
    this.artistId = (localStorage.getItem('user') as any)!.id;
  }
  ngOnInit() {
    this.artworkForm = this.fb.group({
      title: ['', [Validators.required]],
      price: [null, [Validators.required, Validators.min(0)]],
      category: [[]],
      description: ['', [Validators.required]],
      artist: [
        JSON.parse(localStorage.getItem('user') as any).id,
        [Validators.required],
      ],
    });
    this.getCategories();
  }

  onSelect(event: { addedFiles: any }) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  getCategories() {
    this.artworkService.getCategories().subscribe({
      next: (data: any) => {
        data.data.forEach((item: any) => {
          this.categories.push(item);
        });
      },
      error: (err) => {
        toastMixin('error', 'Failed to fetch categories');
      },
      complete: () => {},
    });
  }

  onCategoryChange(event: any, category: any) {
    if (event.target.checked) {
      this.categoryIds.push(category.id);
    } else {
      this.categoryIds.splice(this.categoryIds.indexOf(category.id), 1);
    }
    this.categoryIds = [...this.categoryIds];
    this.artworkForm.get('category')?.patchValue([...this.categoryIds]);
  }

  async generateDescription() {
    if (!this.artworkForm?.get('title')?.value) {
      toastMixin(
        'warning',
        'Please provide a title so that a suitable description can be generated'
      );
      return;
    }

    let prompt = `Generate an engaing description for an artwork based on the title of the artwork. The description should be less than or equal to 50 words. The title is "${this.artworkForm.value.title}"`;
    if (this.artworkForm.get('category')?.value) {
      const selectedCat: any = [];
      this.artworkForm.get('category')?.value.forEach((category: any) => {
        selectedCat.push(
          this.categories.find((cat: any) => cat.id === category).name
        );
      });
      prompt += `Categories for this artwork are ${selectedCat.join(', ')}`;
    }
    this.llamaService.generateDescription({ prompt: prompt }).subscribe({
      next: (response: any) => {
        this.artworkForm.get('description')?.setValue(response.data);
        this.artworkForm.updateValueAndValidity();
      },
      error: (err) => {
        toastMixin('error', 'Failed to generate description');
      },
    });
  }

  async submit() {
    if (this.files.length > 0 && this.artworkForm.valid) {
      try {
        this.isSubmitting = true;
        for (let file of this.files) {
          const formData = new FormData();
          formData.append('file[]', file);
          const response: any = await lastValueFrom(
            this.artworkService.uploadImages(formData)
          );
          this.newImageIds.push(response.data[0].id);
        }
        this.artworkService
          .createArtwork({
            ...this.artworkForm.value,
            images: this.newImageIds,
          })
          .subscribe({
            next: (res) => {
              this.router.navigate(['/artworks']);
              toastMixin('success', 'Artwork posted successfully!');
            },
            error: (err) => {
              toastMixin('error', 'Failed to upload artwork');
            },
          });
      } catch (err) {
        toastMixin('error', 'Failed to upload artwork');
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
