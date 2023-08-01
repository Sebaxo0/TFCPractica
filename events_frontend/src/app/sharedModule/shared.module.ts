import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PanelComponent } from './panel/panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        PanelComponent
    ],
    imports: [ 
        CommonModule, 
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
     ],
    exports: [HeaderComponent, SidebarComponent, PanelComponent],
    providers: [],
})
export class SharedModule {}