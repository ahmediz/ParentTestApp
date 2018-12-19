import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: '.app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input() user: any;

  constructor(private usersService: UsersService, private dialog: MatDialog) {}

  ngOnInit() {}

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
        user: this.usersService.getUser(id)
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
