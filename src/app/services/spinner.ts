import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _isLoading: WritableSignal<boolean> = signal(false);

  public readonly isLoading = this._isLoading.asReadonly();

  show(): void {
    this._isLoading.set(true);
  }

  hide(): void {
    this._isLoading.set(false);
  }
}
