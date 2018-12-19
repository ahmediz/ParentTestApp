import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UiService } from '../services/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'https://reqres.in';
  token: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private uiService: UiService
  ) {}

  login(credientials) {
    this.uiService.isLoading.next(true);
    this.http.post(this.baseURL + '/api/login', credientials).subscribe(res => {
      this.token = res['token'];
      this.uiService.isLoading.next(false);
      this.router.navigate(['/']);
    });
  }

  isAuthenticated() {
    return this.token != null;
  }
}
