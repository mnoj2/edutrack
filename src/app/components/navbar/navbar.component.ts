import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  private toast = inject(HotToastService);

  onLogout() {
    this.authService.logout(); 
    this.toast.success("Logged out successfully!");
    this.router.navigate(['/login']);
  }
}
