import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './component/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
    { path: '', component: LoginComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)]
})
export class LoginRoutingModule {}
