import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './../global';
import { LocalService } from './../localService'
import { SharingService } from './../sharing.service';
import { AuthUserModel } from '../../models/authentication/auth_user.model';
import { AuthResponse } from '../../models/authentication/auth_response.model';

@Injectable()

export class AuthUserService {
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

	update(params: AuthUserModel): Observable<AuthResponse<AuthUserModel>>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token)
		return this._http.put<AuthResponse<AuthUserModel>>(this.auth_url + "auth-user-by-id/"+ params._id, params,  {headers: headers});
	}
    save(params: AuthUserModel): Observable<AuthResponse<AuthUserModel>>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token)
		return this._http.post<AuthResponse<AuthUserModel>>(this.auth_url + "auth-user", params,  {headers: headers});
	}
    get(): Observable<AuthResponse<Array<AuthUserModel>>>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token)
		return this._http.get<AuthResponse<Array<AuthUserModel>>>(this.auth_url + "auth-user",  {headers: headers});
	}
    remove(params: AuthUserModel): Observable<AuthResponse<AuthUserModel>>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token)
		return this._http.delete<AuthResponse<AuthUserModel>>(this.auth_url + "auth-user/"+ params._id,  {headers: headers});
	}
}