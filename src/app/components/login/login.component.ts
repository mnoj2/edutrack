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
  errorMessage: string = '';
  isSuccess: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required ]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  // ! Hardcode validation
  ngOnInit(): void {
    console.log("Loaded");
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;

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

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

}
