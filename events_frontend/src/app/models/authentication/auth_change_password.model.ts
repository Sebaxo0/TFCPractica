export class AuthChangePassword {
    constructor(
        public current_password: string,
        public new_password: string,
        public confirm_new_password: string
    ) {

    }
}
export interface AuthPasswordResponse {
    message: string,
}