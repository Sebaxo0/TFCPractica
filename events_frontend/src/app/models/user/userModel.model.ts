
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class UserModel{
	public user: FormGroup
	constructor(
		
	){
		this.user = new FormBuilder().group({
			givenName: ['', Validators.required], //name
			surname: ['', Validators.required], //lastname
			displayName: ['', Validators.required],
            mail: [''],  //email
            microsoftId: [''], 
            rut: [''], // back
            phone: [''],
            username: [''], // back
            password: [''], // back
            restorePassword: [false], // back
            recoveryToken: [false], // back
            updateUser: [false],
            active: [false]
		})
	}
}

export class UserModelWithParameters{
	public user: FormGroup
	constructor(
        public identity: {
            _id: string
            givenName: string,
            surname: string,
            displayName: string,
            mail: string,
            microsoftId: string,
            password: string,
            rut: string,
            phone: string,
            username: string,
            updateUser: boolean,
			restorePassword: boolean,
        }
		
	){
		this.user = new FormBuilder().group({
            _id: [identity._id],
			givenName: [identity.givenName, Validators.required], //name
			surname: [identity.surname, Validators.required], //lastname
			displayName: [identity.displayName, Validators.required],
            mail: [identity.mail],  //email
            microsoftId: [identity.microsoftId], 
            rut: [identity.rut], // back
            phone: [identity.phone],
            username: [identity.username], // back
            password: [identity.password], // back
            restorePassword: [identity.restorePassword], // back
            recoveryToken: [false], // back
            updateUser: [identity.updateUser],
            active: [false]
		})
	}
}
