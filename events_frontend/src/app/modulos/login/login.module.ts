import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './component/login.component';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginRoutingModule } from './login.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [LoginComponent],
    imports: [ 
        LoginRoutingModule,
       HttpClientModule,
       CommonModule, 
       FormsModule, 
       ReactiveFormsModule,
    ],
    exports: [],
    providers: [],
})
export class LoginModule {}