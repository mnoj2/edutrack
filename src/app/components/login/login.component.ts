import { Component, inject, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private authService = inject(AuthService);  
  private toast = inject(HotToastService);
  private router = inject(Router);
  private loginSubscription?: Subscription;

  usernameError: string = '';
  passwordError: string = '';
  showPassword = false;

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  onSubmit() {
    this.usernameError = '';
    this.passwordError = '';

    const username = this.loginForm.value.username?.trim();
    const password = this.loginForm.value.password?.trim();

    if (!username || username.length === 0) {
      this.usernameError = 'Username is required';
      return;
    }

    if (!password || password.length === 0) {
      this.passwordError = 'Password is required';
      return;
    }
    
    if (password.length < 8) {
      this.passwordError = 'Password must be at least 8 chars';
      return;
    }

    this.authService.changeUser(username);

    this.loginSubscription = this.authService.login(username!, password!).subscribe({
      next: (success) => {
        if(success) {
          this.toast.success('Login Successful!');
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 1000);
        }
        else {
          this.toast.error('Invalid username or password');
        }
      },
      error: () => {
        this.toast.error('Error loading user data');
      }
    });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
