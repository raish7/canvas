import { Component, input, output } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { toastMixin } from '../../../utils/toastMixin';
import { ArtworksService } from '../../../services/artworks/artworks.service';
import { AuthService } from '../../../services/auth/auth.service';
import { LlamaService } from '../../../services/llama/llama.service';
import { FormsModule } from '@angular/forms';
import { AvatarSkeletonComponent } from "../../skeleton/avatar-skeleton/avatar-skeleton.component";

@Component({
  selector: 'app-profile-avatar',
  standalone: true,
  imports: [FormsModule, AvatarSkeletonComponent],
  templateUrl: './profile-avatar.component.html',
  styleUrl: './profile-avatar.component.scss',
})
export class ProfileAvatarComponent {
  userProfile = input<any>();
  showEditBtn = input<boolean>();
  fetchingProfile = input<boolean>();
  id = input.required<any>();
  profilePicChanged = output<any>();

  generatedImage: string | undefined;
  avatarPrompt = '';
  isLoading = false;
  isGeneratingImage = false;
  isUpdatingProfile = false;
  base64String = '';
  constructor(
    private llamaService: LlamaService,
    private artworkService: ArtworksService,
    private authService: AuthService
  ) {}

  async generateAvatar() {
    if (!this.avatarPrompt) return;
    this.isGeneratingImage = true;
    this.llamaService
      .generateAvatarImage({ userPrompt: this.avatarPrompt })
      .subscribe({
        next: (res: any) => {
          this.generatedImage = `data:image/png;base64,${res.data}`;
          this.base64String = res.data;
        },
        error: (err: any) => {
          toastMixin('error', 'Failed to generate avatar');
        },
        complete: () => {
          this.isGeneratingImage = false;
        },
      });
  }

  async changeProfilePic() {
    this.isUpdatingProfile = true;
    const blob = this.convertBase64ToBlob(this.base64String);
    const formData = new FormData();
    formData.append('file[]', blob);
    const response: any = await lastValueFrom(
      this.artworkService.uploadImages(formData)
    );
    this.authService
      .updateUserProfile(this.id(), { profilePic: response.data[0].url })
      .subscribe({
        next: (res: any) => {
          this.userProfile().profilePic = this.generatedImage;
          const currProfile = JSON.parse(
            localStorage.getItem('currProfile') as any
          );
          currProfile.profilePic = response.data[0].url;
          localStorage.setItem('currProfile', JSON.stringify(currProfile));
          (document.querySelector('#my_modal_6') as HTMLInputElement).checked =
            false;
          this.generatedImage = '';
          this.avatarPrompt = '';
          this.profilePicChanged.emit(null);
        },
        error: (err: any) => {
          toastMixin('error', 'Failed to update profile');
        },
        complete: () => {
          this.isUpdatingProfile = false;
        },
      });
  }

  convertBase64ToBlob(base64: string) {
    const byteString = atob(base64);
    const buffer = new ArrayBuffer(byteString.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < byteString.length; i++) {
      view[i] = byteString.charCodeAt(i);
    }
    return new Blob([buffer], { type: 'image/png' });
  }

}
