import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LOCALE } from 'src/app/locale/languages/locale.lenguage';



// import Swal from "sweetalert2";
import appSettings from 'src/app/config/app-settings';
import { UserService } from 'src/app/services/user.service';
import { MicrosoftAuthService } from 'src/app/services/auth-microsoft.service';
import { SharingService } from 'src/app/services/sharing.service';
import { LocalService } from 'src/app/services/localService';
import { Observable } from 'rxjs';
import { AuthLoginModel } from 'src/app/models/authentication/auth_login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService, MicrosoftAuthService, SharingService]
})

export class LoginComponent implements OnInit {
  languages = LOCALE
  language
  language$ = new Observable<string>()
  bgList;
  app;
  appSettings = appSettings;
  public logo_iasd = "assets/img/logo.png"
  public bg = "assets/img/logo_camporee.jpg";
  public userLoginForm: FormGroup;
  public closeResult: string;
  public page_title: string;
  public status: string;
  public mensaje: string;
  public estado: boolean;
  public identity;
  public token;
  public enviarUsuario: string;
  public generica = false;
  public ruta;
  public fecha = new Date();
  public year = this.fecha.getFullYear();
  public cargando = false
  dataToken
  public auth_login: AuthLoginModel
  constructor(private router: Router, private renderer: Renderer2,
    private _userService: UserService,
    private _localService: LocalService,
    private _router: Router,
    private _route: ActivatedRoute,
    // private modalService: NgbModal,
    private _authMicrosoft: MicrosoftAuthService,
    private _sharingService: SharingService,
    private _fb: FormBuilder,) {
    this.appSettings.appEmpty = true;
    this.language$ = _sharingService.sharingLanguage

    this.userLoginForm = this._fb.group({
      user: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]]
    });
    // console.log(es_cl)
  }

  ngOnInit() {
    this._route.queryParams.subscribe((params) => {
      params['code'] ? this.loginMicrosoft(params) : null
    })
    this.language$.subscribe(s => {
      this.language = LOCALE.find(l => l.name == s).value.LOGIN
    })



  }

  changeLanguage(language_sel) {
    this._sharingService.sharingLanguageData = language_sel
  }


  private loginMicrosoft(params) {
    this.cargando = true
    this._authMicrosoft.authPopUp(params).subscribe(response => {
      if (response.error) {
        this._router.navigate(["/login"])
        localStorage.clear();
      } else {
        this.decryptToken(response.access_token)
      }
    })
  }

  public decryptToken(access_token) {
    this._authMicrosoft.decryptToken(access_token).subscribe(response_token => {
      this._localService.setJsonValue('token', response_token.token)
      this._localService.setJsonValue('identity', JSON.stringify(response_token.identity))
      this.chargeDataUser()

    })
  }

  chargeDataUser() {

    this.appSettings.appEmpty = false;
    this._router.navigate(["/inicio"])
  }


  public login() {
    this.cargando = true
    if (this.userLoginForm.invalid) {
      this._authMicrosoft.getTokenAPI().subscribe(response => {
        let a = document.createElement("a");
        a.href = response.url
        a.click()
      })
    } else {

      this.auth_login = {
        username: this.userLoginForm.value.user,
        password: this.userLoginForm.value.password,
        gettoken: true
      }
      this._userService.login(this.auth_login).subscribe(response => {
        if (response)
        this.loginGuest()
      }, (error) => {

        this.cargando = false
      }

      )
    }
  }

  loginGuest() {
    this._userService.login(this.auth_login).subscribe(res => {

      this._localService.setJsonValue('token', res.token)
      this._localService.setJsonValue('identity', JSON.stringify(res.identity))
      this.chargeDataUser()


    })

  }


}
