import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { Password } from 'primeng/password';
import { Checkbox } from 'primeng/checkbox';
import { Button } from 'primeng/button';
import { SpinnerService } from '../../services/spinner';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    FloatLabel,
    InputText,
    Password,
    Checkbox,
    Button,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private spinnerService: SpinnerService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  isInvalid(controlName: string): boolean {
    const control = this.formControls[controlName];
    return (control && control.invalid && (control.dirty || control.touched));
  }

  getErrorMessage(controlName: string): string {
    const control = this.formControls[controlName];
    if (control?.errors) {
      if (control.errors['required']) {
        return `${this.getControlLabel(controlName)} is required`;
      }
      if (control.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (control.errors['minlength']) {
        return `Password must be at least ${control.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  private getControlLabel(controlName: string): string {
    const labels: { [key: string]: string } = {
      email: 'Email',
      password: 'Password'
    };
    return labels[controlName] || controlName;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.spinnerService.show();

      // Simulate API call
      setTimeout(() => {
        this.loading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Login successful!'
        });
        this.spinnerService.hide();

        // Navigate to dashboard or home
        this.router.navigate(['/dashboard']);
      }, 2000);
    } else {
      this.markFormGroupTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please fill in all required fields correctly'
      });
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  onForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
