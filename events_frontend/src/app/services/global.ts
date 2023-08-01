import { environment } from "src/environments/environment"

let localhost = {
	url: "http://localhost:3700/api-declaracion/",
	url_auth: 'http://localhost:3700/microsoft-auth/',
	auth_url: 'http://localhost:3700/api-auth/',
	url_socket: "http://localhost:3000",
	url_V2:"http://localhost:3700/api-impuestos/",
	url_reportes: "http://localhost:3700/api-reportes/",
	url_jsreport: "http://localhost:5488/api/report",
	version: "1.1.0.18"
}

let dev = {
	url:  'https://devsistemas.adventistas.cl' + "/api-declaracion/",
	url_auth: '',
	auth_url: 'http://localhost:3700/api-auth/',
	url_socket: 'https://devsocketsistemas.adventistas.cl',
	url_V2: 'https://devsistemas.adventistas.cl' + "/api-impuestos/",
	url_reportes: 'https://devsistemas.adventistas.cl' + "/api-reportes/",
	url_jsreport: "https://api-jsreport.adventistas.cl/api/report",
	version: "1.1.0.18"
}

let test = {
	url: 'https://testsistemas.adventistas.cl/api-declaracion/', 
	url_auth: '',
	auth_url: 'http://localhost:3700/api-auth/',
	url_socket: 'https://testsocketsistemas.adventistas.cl/', 
	url_V2:"https://testsistemas.adventistas.cl/api-impuestos/",
	url_reportes: "https://testsistemas.adventistas.cl/api-reportes/",
	url_jsreport: "https://api-jsreport.adventistas.cl/api/report",
	version: "1.1.0.18"
}

let prod = {
	url: 'https://sistemas.adventistas.cl/api-declaracion/', 
	url_auth: '',
	auth_url: 'http://localhost:3700/api-auth/',
	url_socket: 'https://socketsistemas.adventistas.cl/', 
	url_V2:"https://sistemas.adventistas.cl/api-impuestos/",
	url_reportes: "https://sistemas.adventistas.cl/api-reportes/",
	url_jsreport: "https://api-jsreport.adventistas.cl/api/report",
	version: "1.1.0.18"
}

if (environment.env != 'Production'){
	console.log("Enviroment: " + environment.env)
}

export var Global = environment.env == 'Testing' ? test : (environment.env== 'Production'?prod:(environment.env== 'Development'?dev:localhost))