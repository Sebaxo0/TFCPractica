export class AuthUserModel {
    constructor(
        public updateUser?: boolean,
        public restorePassword?: boolean,
        public _id?: string,
        public displayName?: string,
        public username?: string,
        public active?: boolean,
        public givenName?: string,
        public mail?: string,
        public surname?: string,
        public phone?: number,
        public microsoftId?: string,
        public rut?: string,

    ) {

    }
}