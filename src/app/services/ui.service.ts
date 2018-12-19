import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  isLoading = new Subject<boolean>();
  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(
    message: string,
    action: string,
    duration: number,
    customClass: string
  ) {
    this.snackbar.open(message, action, {
      duration: duration,
      panelClass: [customClass]
    });
  }
}
