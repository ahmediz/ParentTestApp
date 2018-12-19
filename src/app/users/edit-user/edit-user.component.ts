import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  imgPlaceholder = '../../../assets/images/user-placeholder.svg';

  @Output() closeDialog = new EventEmitter<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public usersService: UsersService,
    public uiService: UiService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  // Submitting User Form
  onSubmit() {
    // Checking if we are in the editmode
    if (this.usersService.editMode) {
      const updatedUser = {
        id: this.data.user.id,
        first_name: this.userForm.value.name,
        job: this.userForm.value.job,
        avatar: this.data.user.avatar ? this.data.user.avatar : null
      };
      this.usersService.updateUser(this.data.user.id.toString(), updatedUser);
      this.closeDialog.emit();
    } else {
      if (this.userForm.valid) {
        const user = this.userForm.value;
        this.usersService.addUser(user);
        this.closeDialog.emit();
      }
    }
  }

  private initForm() {
    let userName = '';
    let userJob = '';

    if (this.usersService.editMode) {
      const userLastName = this.data.user.last_name
        ? this.data.user.last_name
        : '';
      const name = this.data.user.first_name + ' ' + userLastName;
      userName = name.trim();
      userJob = this.data.user.job;
    }

    this.userForm = new FormGroup({
      name: new FormControl(userName, Validators.required),
      job: new FormControl(userJob)
    });
  }
}
