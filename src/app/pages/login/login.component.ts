import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { toastMixin } from '../../utils/toastMixin';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  isSubmitting = false;
  routeBack = '';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
      return;
    }

    this.route.queryParams.subscribe((params) => {
      this.routeBack = params['routeBack'];
    });
  }

  login() {
    this.isSubmitting = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        const { id, names, roles, username, access_token } = res.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem(
          'user',
          JSON.stringify({ id, names, roles, username })
        );
        this.authService.isAuthenticated.next(true);
        if (this.routeBack) {
          // this.router.navigate([this.routeBack]);
          window.location.href = this.routeBack;
        } else {
          // this.router.navigate(['/home']);
          window.location.href = '/';
        }
      },
      error: (err) => {
        toastMixin('error', err?.error?.message || 'Failed to login');
        this.isSubmitting = false;
      },
    });
  }
}
