import { Component, OnInit } from '@angular/core';
import { PasswordModel } from 'src/app/models/user/passwordModel.model';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { LOCALE } from 'src/app/locale/languages/locale.lenguage';
import { SharingService } from 'src/app/services/sharing.service';
import { UserService } from 'src/app/services/user.service';

import Swal from 'sweetalert2';
import { AuthChangePassword } from 'src/app/models/authentication/auth_change_password.model';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers:[UserService]
})
export class PasswordComponent implements OnInit {
  public password!: PasswordModel 
  public passwordForm!: FormGroup
  public change_password: AuthChangePassword
  identity
  languages = LOCALE
  language
  language$ = new Observable<string>()
  
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  })

  constructor(
    private _sharingService: SharingService,
    private _userService: UserService,
    private _router: Router
  ){
    this.password = new PasswordModel()
    this.passwordForm = this.password.password
    this.identity = _userService.getIdentity()
    this.language$ = this._sharingService.sharingLanguage
  }

  ngOnInit(){
    this.language$.subscribe(s => {
      this.language = LOCALE.find(l => l.name == s).value.USER.CHANGE_PASSWORD
   }) 
  }

 

  printForm(){
    if(this.passwordForm.value.new == this.passwordForm.value.confirm) {
      this.identity.password = this.passwordForm.value.new
      console.log(this.passwordForm.value)
      this.change_password = {
        current_password: this.passwordForm.value.current,
        new_password: this.passwordForm.value.new,
        confirm_new_password: this.passwordForm.value.confirm
      }
      this._userService.restorePassword(this.change_password).subscribe( response => {
        this.Toast.fire({
          icon: 'success',
          title: this.language.PASSWORD_CHANGED
        });
        setTimeout(() => {
          this.logout()
        }, 1500)
       
      })
    }else{
      console.log("no coinciden las contraseñas")
    }
  }

  logout(){
    
    localStorage.clear()
    this._sharingService.sharingEntitiesData = null
    this._sharingService.sharingEntityData = null
    this._sharingService.sharingIdentityData = null
    this._sharingService.sharingTokenData = null
    
		this._router.navigate(['/login'])
  }
}
