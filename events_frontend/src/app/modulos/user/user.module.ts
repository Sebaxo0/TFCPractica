import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/sharedModule/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { PasswordComponent } from './password/password.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthUserComponent } from './auth-user/auth-user.component';

@NgModule({
  declarations: [
    PasswordComponent,
    ProfileComponent,
    AuthUserComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
