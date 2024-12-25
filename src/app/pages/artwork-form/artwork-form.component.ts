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
    private router: Router
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
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
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
        console.log('err', err);
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

  // async uploadImage() {
  //   console.log('files', this.files);
  //   // if (this.files.length > 0) {
  //   //   this.files.forEach((file) => {
  //   //     const formData = new FormData();
  //   //     formData.append('file[]', file);
  //   //     this.artworkService.uploadImages
  //   //     this.artworkService.uploadImages(formData).subscribe({
  //   //       next: (res: any) => {
  //   //         console.log('res>>>>', res);
  //   //         this.newImageIds.push(res.data.id);
  //   //       },
  //   //       error: (err) => {
  //   //         console.log('err', err);
  //   //         toastMixin('error', 'Failed to upload image');
  //   //       },
  //   //     });
  //   //   });
  //   // }

  //   try {
  //     const uploadPromises = this.files.map(async (file) => {
  //       const formData = new FormData();
  //       formData.append('file[]', file);
  //       const response = await lastValueFrom(
  //         this.artworkService.uploadImages(formData)
  //       );
  //       console.log('response', response);
  //       return response;
  //     });
  //     const response = await Promise.all([uploadPromises]);
  //     return response;
  //   } catch (err) {
  //     console.error('Error during uploads:', err);
  //     toastMixin('error', 'Failed to upload one or more images');
  //     return err;
  //   }
  // }

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
