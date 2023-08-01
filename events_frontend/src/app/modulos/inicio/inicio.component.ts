import { Component, OnInit } from '@angular/core';
import appSettings from '../../config/app-settings';
import { SharingService } from '../../services/sharing.service';
import { LocalService } from '../../services/localService';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  providers: []
})
export class InicioComponent implements OnInit {
  appSettings = appSettings;
  // public identity$ 
  // public entities$ 
  public entidades = []

  public titulo = " Inicio";
	public descripcion ="Sistemas UCh";
  public icono = "fas fa-home fa-fw";


  constructor(private _sharingService: SharingService, private _localService: LocalService,) {
    // this.identity$ = this._sharingService.sharingIdentity
    // this.entities$ = _sharingService.sharingEntities
   // this.pageSettings.pageWithFooter = true

  }

  ngOnInit() {
    setTimeout(() => {
      this._sharingService.sharingIdentityData = JSON.parse(this._localService.getJsonValue('identity'))
      // this._sharingService.sharingEntitiesData = JSON.parse(this._localService.getJsonValue('entities'))
      // this._sharingService.sharingEntityData = JSON.parse(this._localService.getJsonValue('entity'))
    },0)
    
  }
	
}
