import { Component } from '@angular/core';
//services
import { AuthUserService } from '../../../services/authentication/auth_user.service'
import { AuthUserModel } from 'src/app/models/authentication/auth_user.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-user',
  templateUrl: './auth-user.component.html',
  styleUrls: ['./auth-user.component.scss'],
  providers: [AuthUserService]
})
export class AuthUserComponent {
  public title: string

  public users: Array<AuthUserModel>
  public user: AuthUserModel
  public updateForm!: FormGroup

  constructor(
    private _authUserService: AuthUserService
  ) {
    this.title = "Gestión de usuarios"

    this.updateForm = new FormGroup({
      givenName: new FormControl(),
      surname: new FormControl(),
      mail: new FormControl()

    });

    this.get()
  }

  get() {
    this._authUserService.get().subscribe((response) => {
      this.users = response.result
      console.log(this.users)

    }, (error) => { console.log(error) })
    console.log("dentro del get")
  }

  select(user:AuthUserModel){
    console.log(user)
    this.updateForm = new FormGroup({
      givenName: new FormControl(user.givenName),
      surname: new FormControl(user.surname),
      mail: new FormControl(user.mail)

    });

  }
  update() {

    console.log(this.updateForm.value)
  }

}
