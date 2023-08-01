import {AuthUserModel} from "../authentication/auth_user.model"

export class AuthLoginModel {
    constructor(
        public username: string,
        public password: string,
        public gettoken: boolean
    ) {

    }
}
export interface AuthLoginResponse {

    token: string,
    identity: AuthUserModel
    verify: boolean,
    status: number,
    message: string

}