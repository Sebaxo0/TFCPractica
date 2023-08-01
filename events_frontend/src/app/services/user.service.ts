import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { LocalService } from './localService'
import { SharingService } from './sharing.service';
import { AuthLoginModel, AuthLoginResponse } from '../models/authentication/auth_login.model'
import { AuthUserModel } from '../models/authentication/auth_user.model';
import { AuthResponse } from '../models/authentication/auth_response.model';
import { AuthChangePassword, AuthPasswordResponse } from '../models/authentication/auth_change_password.model';

@Injectable()

export class UserService {
	public url: string;
	public identity;
	private token
	public tokenrecuperacion;
	public auth_url: string

	constructor(private _http: HttpClient, private _localService: LocalService, private _sharingService: SharingService) {
		this.url = Global.url;
		this.auth_url = Global.auth_url
		this.token = this.getToken()
		this.identity = this.getIdentity()
		// this.tokenrecuperacion = this.getTokenRecuperacion();
	}

	getMenu(): Observable<any>{
		let params = this.identity
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
		return this._http.post(this.url+'get-menu', params, {headers: headers});
	}
	getIdentity() {
		let identity = JSON.parse(this._localService.getJsonValue('identity'));
		identity ? this.identity = identity : this.identity = null;

		return this.identity;
	}

	getToken() {
		let token = this._localService.getJsonValue('token');
		token ? this.token = token : this.token = null

		return this.token;
	}

	login(params: AuthLoginModel): Observable<AuthLoginResponse>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');
		return this._http.post<AuthLoginResponse>(this.auth_url + "auth-user-login", params,  {headers: headers});
	}
	updateUser(params: AuthUserModel): Observable<AuthResponse<AuthUserModel>>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token)
		return this._http.put<AuthResponse<AuthUserModel>>(this.auth_url + "auth-management-update-my-user", params,  {headers: headers});
	}

	restorePassword(params: AuthChangePassword): Observable<AuthResponse<AuthChangePassword>>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token)
		return this._http.put<AuthResponse<AuthChangePassword>>(this.auth_url + "auth-management-change-my-password", params,  {headers: headers});
	}
}
