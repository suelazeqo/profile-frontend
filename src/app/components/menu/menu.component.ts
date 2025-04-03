import {Component, HostListener, inject} from '@angular/core';
import {LoginModalComponent} from '../login-modal/login-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isMenuOpen = false;
  isScrolled = false;

  private dialog = inject(MatDialog);
  public authService = inject(AuthService);


  openLoginModal() {
    this.dialog.open(LoginModalComponent, {
      width: '350px'
    });

  }

  logout() {
    this.authService.logout();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 40;
  }
}
