import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: any[];
  usersChanged = new Subject<any[]>();
  editMode = false;

  baseURL = 'https://reqres.in';

  constructor(
    private http: HttpClient,
    private router: Router,
    private uiService: UiService
  ) {
    // Fetching Users and setting them
    this.http.get(this.baseURL + '/api/users').subscribe(res => {
      const users = res['data'];
      this.setUsers(users);
    });
  }

  // Setting coming users to our users array
  setUsers(users: any[]) {
    this.users = users;
    this.usersChanged.next(this.users);
  }

  // Getting Users Array
  getUsers() {
    return this.users;
  }

  // Getting Single User
  getUser(id: string) {
    if (this.users) {
      return this.users.filter(user => user.id.toString() === id)[0];
    }
  }

  // Adding User via API
  addUser(user) {
    this.uiService.isLoading.next(true);
    this.http.post(this.baseURL + '/api/users', user).subscribe(res => {
      const newUser = { first_name: res['name'], ...res };
      this.users.unshift(newUser);
      this.uiService.isLoading.next(false);
      this.uiService.showSnackbar(
        'User has been added',
        null,
        3000,
        'panel_success'
      );
    });
  }

  // Removing User
  deleteUser(id: string) {
    this.uiService.isLoading.next(true);
    this.http.delete(this.baseURL + '/api/users/' + id).subscribe(res => {
      this.users = this.users.filter(user => user.id.toString() !== id);
      this.usersChanged.next(this.users);
      this.uiService.isLoading.next(false);
      this.router.navigate(['/']);
      this.uiService.showSnackbar(
        'User has been deleted!',
        null,
        3000,
        'panel_danger'
      );
    });
  }

  // Update User
  updateUser(id: string, newUser: any) {
    this.uiService.isLoading.next(true);
    this.http.put(this.baseURL + '/api/users/', id).subscribe(res => {
      const updatedUser = this.users.find(this.findIndexToUpdate, newUser.id);
      const index = this.users.indexOf(updatedUser);
      this.users[index] = newUser;
      this.usersChanged.next(this.users);
      this.uiService.isLoading.next(false);
      this.router.navigate(['/']);
      this.uiService.showSnackbar(
        'User has been updated!',
        null,
        3000,
        'panel_success'
      );
    });
  }

  findIndexToUpdate(newUser) {
    return newUser.id === this;
  }
}
