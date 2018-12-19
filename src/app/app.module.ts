import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { MaterialModule } from './material.module';

// Components
import { UsersComponent } from './users/users.component';
import { HeaderComponent } from './layout/header/header.component';
import { UserItemComponent } from './users/user-item/user-item.component';
import { UserDetailsComponent } from './users/user-details/user-details.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { LoginComponent } from './auth/login/login.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

// Services
import { UsersService } from 'src/app/services/users.service';
import { UiService } from './services/ui.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HeaderComponent,
    UserItemComponent,
    UserDetailsComponent,
    EditUserComponent,
    ConfirmDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [UsersService, UiService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [EditUserComponent, ConfirmDialogComponent]
})
export class AppModule {}
