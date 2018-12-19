import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  id: string;
  user: any;
  paramsSubscription: Subscription;
  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (this.id) {
        this.user = this.usersService.getUser(this.id);
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  // Removing User on Click
  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '360px',
      data: {
        user: this.usersService.getUser(id)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.deleteUser(id);
      }
    });
  }

  // Init Edit User Dialog
  openDialog(id: string) {
    this.usersService.editMode = true;
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '360px',
      data: {
        user: this.usersService.getUser(this.id)
      }
    });
    dialogRef.componentInstance.closeDialog.subscribe(() => {
      dialogRef.close();
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.editMode = false;
      } else {
        this.usersService.editMode = false;
      }
    });
  }
}
