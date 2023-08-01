import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../../app.component';
import { SharedModule } from 'src/app/sharedModule/shared.module';

const routes: Routes = [
    {
        path: '',
        component: InicioComponent
    }
]
console.log("inicio module")


@NgModule({
    declarations: [InicioComponent ],
    imports: [ CommonModule,RouterModule.forChild(routes), SharedModule ],
    exports: [],
    providers: [],
})
export class InicioModule {}