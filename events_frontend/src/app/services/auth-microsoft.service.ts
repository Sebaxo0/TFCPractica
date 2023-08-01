import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { LocalService } from './localService'
import { UserService } from './user.service';
import { SharingService } from './sharing.service';

@Injectable({
    providedIn: 'root'
})

export class MicrosoftAuthService {
    private url;
    public identity;
    public token;
    public tokenrecuperacion;

    constructor(private _http: HttpClient, private _localService: LocalService, private _userService: UserService, private _sharingService: SharingService) {
        this.url = Global.url_auth
        this.token = this._userService.getToken()
    }

    

    getTokenAPI(): Observable<any> {
        //convertir el objeto del usuario a un JSON string
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        //definir las cabeceras
        return this._http.get(this.url + "get-token", {headers: headers});
    }

    authPopUp(data): Observable<any> {
        //convertir el objeto del usuario a un JSON string
        let params = JSON.stringify(data)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + "authorize-token", params, { headers: headers});
    }

    decryptToken(token): Observable<any> {
        //convertir el objeto del usuario a un JSON string
        let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
        //definir las cabeceras
        return this._http.get(this.url + "decrypt-token", {headers: headers});
    }

    getPhoto(): Observable<any> {
        //convertir el objeto del usuario a un JSON string
        console.log(this.token)
        let headers = new HttpHeaders().set('Content-Type', 'application/blob').set('Authorization', this.token);
        //definir las cabeceras
        return this._http.get(this.url + "get-photo", {headers: headers});
    }
}
