
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export class PasswordModel {
	public password: FormGroup
	constructor(

	) {
		this.password = new FormBuilder().group({
			current: ['', Validators.required],
			new: ['', Validators.required],
			confirm: ['', Validators.required]
		})
	}
}

