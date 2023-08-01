import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SharingService {
    private sharingObservableIdentity: BehaviorSubject<{}> = new BehaviorSubject<{}>({});
    private sharingObservableEntity: BehaviorSubject<{}> = new BehaviorSubject<{}>({});
    private sharingObservableEntities: BehaviorSubject<[]> = new BehaviorSubject<[]>([] );
    private sharingObservableToken: BehaviorSubject<''> = new BehaviorSubject<''>('');
    private sharingObservableLanguage: BehaviorSubject<string> = new BehaviorSubject<string>('es-CL');


    get sharingIdentity(){
        return this.sharingObservableIdentity.asObservable();
    }

    set sharingIdentityData(data){
        this.sharingObservableIdentity.next(data);
    }

    get sharingToken(){
        return this.sharingObservableToken.asObservable();
    }

    set sharingTokenData(data){
        this.sharingObservableToken.next(data);
    }

    get sharingEntity(){
        return this.sharingObservableEntity.asObservable();
    }

    set sharingEntityData(data){
        this.sharingObservableEntity.next(data);
    }

    get sharingEntities(){
        return this.sharingObservableEntities.asObservable()
    }

    set sharingEntitiesData(data){
        this.sharingObservableEntities.next(data);
    }

    get sharingLanguage(){
        return this.sharingObservableLanguage.asObservable()
    }

    set sharingLanguageData(data){
        this.sharingObservableLanguage.next(data);
    }
     
}