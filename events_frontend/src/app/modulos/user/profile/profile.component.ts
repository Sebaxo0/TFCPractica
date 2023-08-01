import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LOCALE } from 'src/app/locale/languages/locale.lenguage';
import { UserModel, UserModelWithParameters } from 'src/app/models/user/userModel.model';
import { SharingService } from 'src/app/services/sharing.service';
import { UserService } from 'src/app/services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

  user: UserModel
  userForm: FormGroup
  languages = LOCALE
  language
  language$ = new Observable<string>()
  identity

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })

  constructor(
    private _sharingService: SharingService,
    private _userService: UserService
  ) {
    this.language$ = this._sharingService.sharingLanguage
    this.identity = this._userService.getIdentity()
    this.user = new UserModelWithParameters(this.identity)
    console.log(this.user)
    this.userForm = this.user.user
  }

  ngOnInit() {
    this.language$.subscribe(s => {
      this.language = LOCALE.find(l => l.name == s).value.USER.PROFILE
   }) 
  }

  updateProfile(){
    // console.log(this.user.user.value)
    this._userService.updateUser(this.user.user.value).subscribe(response => {
      this._sharingService.sharingIdentityData = this.user.user.value
      this.Toast.fire({
        icon: 'success',
        title: "Usuario actualizado correctamente"
      });
    })
  }
}
