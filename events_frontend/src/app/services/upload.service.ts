import { Injectable } from '@angular/core';
import { Global } from './global';
import { UserService } from './user.service';

@Injectable()

export class UploadService{
	public url: string;
	public identity;
	public token;

	constructor(
		private _userService: UserService,
	){
		this.url = Global.url;
		
    	// this.token = this._userService.getToken();
	}

	makeFileRequest( url: string, params: Array<String>, files: Array<File>, name: string, token){
		//console.log(params); return false;
		return new Promise(function(resolve, reject){
			var formData = new FormData();
			var xhr = new XMLHttpRequest();
			for (var i = 0; i < files.length; i++) {
				formData.append(name, files[i], files[i].name)
			}

			xhr.onreadystatechange = function(){
				if (xhr.readyState == 4) {
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}else{
						reject(xhr.response);
					}
				}
			}
			
			xhr.open('POST', url, true);
			xhr.setRequestHeader("Authorization", token);
			xhr.send(formData);
		});

	}


}