import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import appSettings from '../../config/app-settings';
import { Global } from '../../services/global';
import { Observable } from 'rxjs';
import { SharingService } from '../../services/sharing.service';
import { LocalService } from '../../services/localService';
import { MicrosoftAuthService } from '../../services/auth-microsoft.service';
import { LOCALE } from 'src/app/locale/languages/locale.lenguage';


@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ["./header.component.css"],
	providers: [LocalService],
})
export class HeaderComponent implements OnDestroy {
	@Input() appSidebarTwo;
	@Output() appSidebarEndToggled = new EventEmitter<boolean>();
	@Output() appSidebarMobileToggled = new EventEmitter<boolean>();
	@Output() appSidebarEndMobileToggled = new EventEmitter<boolean>();
	@Output() appDarkModeChanged = new EventEmitter<boolean>();
	@Output() sel_entidad = new EventEmitter<string>();
	@Output() mostrar = new EventEmitter<boolean>();

	appSettings = appSettings;
	languages = LOCALE
	language
	language$ = new Observable<string>()
	public mostrar_header = true
	public ambiente = Global.url;
	public identity$ = new Observable<{}>
	public entities$
	public user_img = document.location.origin + "/assets/img/user/user-iasd.jpg";
	public logo = document.location.origin + "/assets/img/logo.png";



	toggleAppSidebarMobile() {
		this.appSidebarMobileToggled.emit(true);
	}

	toggleAppSidebarEnd() {
		this.appSidebarEndToggled.emit(true);
	}

	toggleAppSidebarEndMobile() {
		this.appSidebarEndMobileToggled.emit(true);
	}

	toggleAppTopMenuMobile() {
		this.appSettings.appTopMenuMobileToggled = !this.appSettings.appTopMenuMobileToggled;
	}

	toggleAppHeaderMegaMenuMobile() {
		this.appSettings.appHeaderMegaMenuMobileToggled = !this.appSettings.appHeaderMegaMenuMobileToggled;
	}

	ngOnDestroy() {
		this.appSettings.appTopMenuMobileToggled = false;
		this.appSettings.appHeaderMegaMenuMobileToggled = false;
	}

	constructor(
		private _router: Router,
		private _sharingService: SharingService,
		private _localService: LocalService,
		// private _authMicrosoft: MicrosoftAuthService
	) {
		this.appSettings.appSidebarLight = true;
		this.language$ = this._sharingService.sharingLanguage
		this.identity$ = this._sharingService.sharingIdentity
		this.entities$ = this._sharingService.sharingEntities

		this.loadSharingData()
	}

	ngOnInit() {
		console.log("Pagina Header")
		this.language$.subscribe(s => {
			this.language = LOCALE.find(l => l.name == s).value.HEADER
		})
	}

	loadSharingData(){
		this._sharingService.sharingIdentityData = JSON.parse(this._localService.getJsonValue('identity'))
		this._sharingService.sharingEntityData = JSON.parse(this._localService.getJsonValue('entity'))
		// this._sharingService.sharingEntitiesData = this._localService.getJsonValue('entities')
	}

	changeLanguage(language_sel) {
		console.log("cambio a: ", language_sel)
		this._sharingService.sharingLanguageData = language_sel
	}

	logout(){
		localStorage.clear()
		this._sharingService.sharingEntitiesData = null
		this._sharingService.sharingEntityData = null
		this._sharingService.sharingIdentityData = null
		this._sharingService.sharingTokenData = null

		this._router.navigate(['/login'])
	  }

	changeEntity(entidad) {
		this._localService.setJsonValue('entidad', JSON.stringify(entidad))
		this._sharingService.sharingEntityData = entidad
	}

	toggleDarkMode(e) {
		this.appSettings.appDarkMode = e.srcElement.checked;
		this.appDarkModeChanged.emit(true);

		if (e.srcElement.checked) {
			document.body.classList.add('dark-mode');
			this.appSettings.appSidebarLight = false;

		} else {
			this.appSettings.appSidebarLight = true;
			document.body.classList.remove('dark-mode');
		}
	}
}
