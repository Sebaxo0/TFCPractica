import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { UserService } from './user.service';
import { Entidad } from '../models/entidad';

@Injectable()

export class NotificacionService{
	public entidades: Array<Entidad>;
	public url:string;
	public identity;
	public token;
  public entidad;
  public nueva_notificacion

	constructor(
		private _http: HttpClient,
		private _userService: UserService,
	) {
		this.url = Global.url;
		// this.identity = this._userService.getIdentity();
		// this.token = this._userService.getToken();
	}

	getNotificaciones():Observable<any>{

		let params = "";
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
		return this._http.post(this.url+'get-notificaciones', params, {headers: headers});

  }

  marcarLeido(id):Observable<any>{

		let params = {id: id};
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
		return this._http.post(this.url+'marcar-leido-notificaciones', params, {headers: headers});

  }

  eliminar(id):Observable<any>{

		let params = {id: id};
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
		return this._http.post(this.url+'eliminar-notificaciones', params, {headers: headers});
  }

  eliminarTodo():Observable<any>{

		let params = {};
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
		return this._http.post(this.url+'eliminar-todas-notificaciones', params, {headers: headers});
  }

  nuevaNotificacion(notificacion, privilegios, tags):Observable<any>{

		let params = {notificacion: notificacion, entidades: tags, privilegios}
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
		return this._http.post(this.url+'nueva-notificacion', params, {headers: headers});

  }

  traerPrivilegios():Observable<any>{

		let params = ""
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
		return this._http.post(this.url+'traer-privilegios-campo', params, {headers: headers});

  }

  verificarEntidad(cod):Observable<any>{

		let params = {codigo: cod};
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
		return this._http.post(this.url+'verificar-entidad', params, {headers: headers});

  }
}
