import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {AuthService} from '../../services/auth.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  templateUrl: './login-modal.component.html',
  imports: [
    CommonModule,
    MatDialogContent,
    MatFormField,
    ReactiveFormsModule,
    MatDialogActions,
    MatInput,
    MatButton,
    MatDialogTitle,
    MatLabel
  ],
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginModalComponent>
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.invalid) return;

    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        localStorage.setItem('token', res.access_token);
        this.dialogRef.close(true);
      },
      (err) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }

  close() {
    this.dialogRef.close();
  }
}
