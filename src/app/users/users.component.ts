import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  users: any[];
  usersSubscription: Subscription;

  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  ngOnInit() {
    this.usersSubscription = this.usersService.usersChanged.subscribe(
      users => (this.users = users)
    );
    this.users = this.usersService.getUsers();
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }

  // Init Add User Dialog
  openDialog() {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '360px',
      data: {}
    });
    dialogRef.componentInstance.closeDialog.subscribe(() => {
      dialogRef.close();
    });
  }
}
