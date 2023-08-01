import { Component, Input, Output, EventEmitter, ElementRef, HostListener, ViewChild, OnInit, AfterViewChecked, AfterViewInit, DoCheck } from '@angular/core';
import appSettings from '../../config/app-settings';
import { slideUp } from '../../composables/slideUp.js';
import { slideToggle } from '../../composables/slideToggle.js';
import { Observable } from 'rxjs';
import { SharingService } from '../../services/sharing.service';
import { UserService } from '../../services/user.service';
import { LocalService } from 'src/app/services/localService';

@Component({
	selector: 'sidebar',
	templateUrl: './sidebar.component.html',
	providers: [UserService]
})

export class SidebarComponent {
	// @ViewChild('sidebarScrollbar', { static: false }) private sidebarScrollbar: ElementRef<any>;
	@Output() appSidebarMinifiedToggled = new EventEmitter<boolean>();
	@Output() hideMobileSidebar = new EventEmitter<boolean>();
	@Output() setPageFloatSubMenu = new EventEmitter();

	@Output() appSidebarMobileToggled = new EventEmitter<boolean>();
	@Input() appSidebarTransparent;
	@Input() appSidebarGrid;
	@Input() appSidebarFixed;
	@Input() appSidebarMinified;

	public menus = [];
	appSettings = appSettings;
	appSidebarFloatSubMenu;
	appSidebarFloatSubMenuHide;
	appSidebarFloatSubMenuHideTime = 250;
	appSidebarFloatSubMenuTop;
	appSidebarFloatSubMenuLeft = '60px';
	appSidebarFloatSubMenuRight;
	appSidebarFloatSubMenuBottom;
	appSidebarFloatSubMenuArrowTop;
	appSidebarFloatSubMenuArrowBottom;
	appSidebarFloatSubMenuLineTop;
	appSidebarFloatSubMenuLineBottom;
	appSidebarFloatSubMenuOffset;

	mobileMode
	desktopMode
	scrollTop

	public entity$ = new Observable<{}>
	public identity$ = new Observable<{}>

	//public menus = [];

	toggleNavProfile(e) {
		e.preventDefault();

		var targetSidebar = <HTMLElement>document.querySelector('.app-sidebar:not(.app-sidebar-end)');
		var targetMenu = e.target.closest('.menu-profile');
		var targetProfile = <HTMLElement>document.querySelector('#appSidebarProfileMenu');
		var expandTime = (targetSidebar && targetSidebar.getAttribute('data-disable-slide-animation')) ? 0 : 250;

		if (targetProfile && targetProfile.style) {
			if (targetProfile.style.display == 'block') {
				targetMenu.classList.remove('active');
			} else {
				targetMenu.classList.add('active');
			}
			slideToggle(targetProfile, expandTime);
			targetProfile.classList.toggle('expand');
		}
	}

	toggleAppSidebarMinified() {
		this.appSidebarMinifiedToggled.emit(true);
		this.scrollTop = 40;
	}

	toggleAppSidebarMobile() {
		this.appSidebarMobileToggled.emit(true);
	}

	calculateAppSidebarFloatSubMenuPosition() {
		var targetTop = this.appSidebarFloatSubMenuOffset.top;
		var direction = document.body.style.direction;
		var windowHeight = window.innerHeight;

		setTimeout(() => {
			let targetElm = <HTMLElement>document.querySelector('.app-sidebar-float-submenu-container');
			let targetSidebar = <HTMLElement>document.getElementById('sidebar');
			var targetHeight = targetElm.offsetHeight;
			this.appSidebarFloatSubMenuRight = 'auto';
			this.appSidebarFloatSubMenuLeft = (this.appSidebarFloatSubMenuOffset.width + targetSidebar.offsetLeft) + 'px';

			if ((windowHeight - targetTop) > targetHeight) {
				this.appSidebarFloatSubMenuTop = this.appSidebarFloatSubMenuOffset.top + 'px';
				this.appSidebarFloatSubMenuBottom = 'auto';
				this.appSidebarFloatSubMenuArrowTop = '20px';
				this.appSidebarFloatSubMenuArrowBottom = 'auto';
				this.appSidebarFloatSubMenuLineTop = '20px';
				this.appSidebarFloatSubMenuLineBottom = 'auto';
			} else {
				this.appSidebarFloatSubMenuTop = 'auto';
				this.appSidebarFloatSubMenuBottom = '0';

				var arrowBottom = (windowHeight - targetTop) - 21;
				this.appSidebarFloatSubMenuArrowTop = 'auto';
				this.appSidebarFloatSubMenuArrowBottom = arrowBottom + 'px';
				this.appSidebarFloatSubMenuLineTop = '20px';
				this.appSidebarFloatSubMenuLineBottom = arrowBottom + 'px';
			}
		}, 0);
	}

	showAppSidebarFloatSubMenu(menu, e) {
		if (this.appSettings.appSidebarMinified) {
			clearTimeout(this.appSidebarFloatSubMenuHide);

			this.appSidebarFloatSubMenu = menu;
			this.appSidebarFloatSubMenuOffset = e.target.getBoundingClientRect();
			this.calculateAppSidebarFloatSubMenuPosition();
		}
	}

	hideAppSidebarFloatSubMenu() {
		this.appSidebarFloatSubMenuHide = setTimeout(() => {
			this.appSidebarFloatSubMenu = '';
		}, this.appSidebarFloatSubMenuHideTime);
	}

	remainAppSidebarFloatSubMenu() {
		clearTimeout(this.appSidebarFloatSubMenuHide);
	}



	@HostListener('scroll', ['$event'])
	onScroll(event) {
		this.scrollTop = (this.appSettings.appSidebarMinified) ? event.srcElement.scrollTop + 40 : 0;
		if (typeof (Storage) !== 'undefined') {
			localStorage.setItem('sidebarScroll', event.srcElement.scrollTop);
		}
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		if (window.innerWidth <= 767) {
			this.mobileMode = true;
			this.desktopMode = false;
		} else {
			this.mobileMode = false;
			this.desktopMode = true;
		}
	}

	// ngAfterViewChecked() {
	// 	if (typeof (Storage) !== 'undefined' && localStorage.sidebarScroll) {
	// 		if (this.sidebarScrollbar && this.sidebarScrollbar.nativeElement) {
	// 			this.sidebarScrollbar.nativeElement.scrollTop = localStorage.sidebarScroll;
	// 		}
	// 	}
	// }

	ngAfterViewInit() {
		var handleSidebarMenuToggle = function (menus, expandTime) {
			menus.map(function (menu) {
				menu.onclick = function (e) {
					e.preventDefault();
					var target = this.nextElementSibling;

					menus.map(function (m) {
						var otherTarget = m.nextElementSibling;
						if (otherTarget !== target) {
							slideUp(otherTarget, expandTime);
							otherTarget.closest('.menu-item').classList.remove('expand');
							otherTarget.closest('.menu-item').classList.add('closed');
						}
					});

					var targetItemElm = target.closest('.menu-item');

					if (targetItemElm.classList.contains('expand') || (targetItemElm.classList.contains('active') && !target.style.display)) {
						targetItemElm.classList.remove('expand');
						targetItemElm.classList.add('closed');
						slideToggle(target, expandTime);
					} else {
						targetItemElm.classList.add('expand');
						targetItemElm.classList.remove('closed');
						slideToggle(target, expandTime);
					}
				}
			});
		};



		var targetSidebar = document.querySelector('.app-sidebar:not(.app-sidebar-end)');
		var expandTime = (targetSidebar && targetSidebar.getAttribute('data-disable-slide-animation')) ? 0 : 300;
		var disableAutoCollapse = (targetSidebar && targetSidebar.getAttribute('data-disable-auto-collapse')) ? 1 : 0;

		var menuBaseSelector = '.app-sidebar .menu > .menu-item.has-sub';
		var submenuBaseSelector = ' > .menu-submenu > .menu-item.has-sub';

		// menu
		var menuLinkSelector = menuBaseSelector + ' > .menu-link';
		var menus = [].slice.call(document.querySelectorAll(menuLinkSelector));
		handleSidebarMenuToggle(menus, expandTime);

		// submenu lvl 1
		var submenuLvl1Selector = menuBaseSelector + submenuBaseSelector;
		var submenusLvl1 = [].slice.call(document.querySelectorAll(submenuLvl1Selector + ' > .menu-link'));
		handleSidebarMenuToggle(submenusLvl1, expandTime);

		// submenu lvl 2
		var submenuLvl2Selector = menuBaseSelector + submenuBaseSelector + submenuBaseSelector;
		var submenusLvl2 = [].slice.call(document.querySelectorAll(submenuLvl2Selector + ' > .menu-link'));
		handleSidebarMenuToggle(submenusLvl2, expandTime);
	}

	constructor(
		private _sharingService: SharingService,
		private _userService: UserService,
		private _localService: LocalService
	) {
		if (window.innerWidth <= 767) {
			this.mobileMode = true;
			this.desktopMode = false;
		} else {
			this.mobileMode = false;
			this.desktopMode = true;
		}


		this.entity$ = this._sharingService.sharingEntity
		this.identity$ = this._sharingService.sharingIdentity





		// this.identity = this._userService.getIdentity();
		// this.token = this._userService.getToken();
		// if (this.identity != null) {
		// 	this.level = this.identity.level[0]; //new Level(this.identity.level,'','',1);
		// 	this.name_level = this.level.nombre;
		// 	this.menu_app = this._userService.getMenu(this.token);
		// 	console.log(this.menus)
		// 	this.getMenu()

		// 	this.entidad.campo = this.identity.campo;
		// 	this._entidadService.getEntidades(this.entidad).subscribe(
		// 		response => {
		// 			this.entidades = response.entidades;
		// 		}
		// 	);

		// 	this.entidad_sel = this._entidadService.getEntidad();
		// 	if (this.entidad_sel != null) {

		// 		this.nombre_entidad = this.entidad_sel.nombre;
		// 		this.codigo_entidad = this.entidad_sel.codigo;
		// 		this.campo_entidad = this.entidad_sel.campo;

		// 	} else {
		// 		this.entidad_sel = { nombre: '', codigo: '', campo: '' };
		// 	}
		// }
	}

	ngOnInit() {
		if (this._userService.getIdentity() != null) {
			this._sharingService.sharingEntityData = this._localService.getJsonValue('entity')
			this._sharingService.sharingIdentityData = this._localService.getJsonValue('identity')
			this.getMenu()
		}
	}

	// ngDoCheck() {
	// 	this.entidad_sel = this._entidadService.getEntidad();
	// 	if (this.entidad_sel != null) {

	// 		this.nombre_entidad = this.entidad_sel.nombre;
	// 		this.codigo_entidad = this.entidad_sel.codigo;
	// 		this.campo_entidad = this.entidad_sel.campo;

	// 	} else {
	// 		this.entidad_sel = { nombre: '', codigo: '', campo: '' };
	// 	}
	// }

	async getMenu() {
		console.log("getMenu")

		let menu = []

		this._userService.getMenu().subscribe(
			(response) => {
				this.menus = []
				response.menu.map((m) => {
					if (!m.url) {
						m.submenu = m.submenu
						//m.url = ""
						m.caret = "true"
						m.state = 'collapsed'
					}

					//this.appSidebarSearch(m)
					this.menus.push(m)
				})
			},
			(error) => {
				console.log(error)
			}
		);
	}

	expandCollapseSubmenu(currentMenu, allMenu, active) {

		for (let menu of allMenu) {
			if (menu != currentMenu) {
				menu.state = 'collapse';
			}
		}
		if (active.isActive) {
			currentMenu.state = (currentMenu.state && currentMenu.state == 'collapse') ? 'expand' : 'collapse';
		} else {
			currentMenu.state = (currentMenu.state && currentMenu.state == 'expand') ? 'collapse' : 'expand';
		}
	}
}
