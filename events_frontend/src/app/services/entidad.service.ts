import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { UserService } from './user.service';
import { LocalService } from './localService';
import { Entidad } from '../models/entidad';


@Injectable()

export class EntidadService{
	public entidades: Array<Entidad>;
	public url:string;
	public identity;
	public token;
	public entidad;

	constructor(
		private _http: HttpClient,
    private _userService: UserService,
    private _localService: LocalService
	) {
		this.url = Global.url;
		// this.identity = this._userService.getIdentity();
		// this.token = this._userService.getToken();
		//this.entidad = new Entidad('',0,'','', '', 0);

	}

	getEntidades(entidad):Observable<any>{

		//entidad.campo = this.identity.campo;
		let params = JSON.stringify(entidad);
		//console.log(params); return false;
		//definir las cabeceras
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
		//Hacer peticion ajax
		var resultado = this._http.post(this.url+'get-entidades', params, {headers:headers});
		return resultado;

	}

	getEntidad(){

		let entidad = JSON.parse(this._localService.getJsonValue('entidad'));

		if (entidad && entidad != null && entidad != undefined && entidad != "undefined" ) {
			this.entidad = entidad;
		}else{
			this.entidad = { nombre:'', codigo:'', campo:''};
			this.entidad = null;
			/*this.entidad.nombre = '';
			this.entidad.codigo = '';
			this.entidad.campo = '';*/
		}
		return this.entidad;
	}

	cambiarEntidadSel(entidad):Observable<any>{

		//entidad.campo = this.identity.campo;
		let params = JSON.stringify(entidad);
		//return entidad;
		//console.log(params); return false;
		//definir las cabeceras
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
		//Hacer peticion ajax
		var resultado = this._http.post(this.url+'cambiar_entidad_sel', params, {headers:headers});
		return resultado;

	}

	getEntidadSel():Observable<any>{

		//entidad.campo = this.identity.campo;
		let params = [];
		//return entidad;
		//console.log(params); return false;
		//definir las cabeceras
		let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', this.token);
		//Hacer peticion ajax
		var resultado = this._http.post(this.url+'trae_entidad_sel', params, {headers:headers});
		return resultado;

	}


}
