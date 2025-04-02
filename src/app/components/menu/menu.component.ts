import {Component, inject} from '@angular/core';
import {LoginModalComponent} from '../login-modal/login-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../../services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
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
}
