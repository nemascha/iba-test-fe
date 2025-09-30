import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProgressSpinner } from 'primeng/progressspinner';
import { SpinnerService } from './services/spinner';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, ProgressSpinner ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  constructor (
    private spinnerService: SpinnerService,
  ) {}

  protected readonly title = signal('iba-test-fe');
  get isLoading(): boolean {
    return this.spinnerService.isLoading();
  }
}
