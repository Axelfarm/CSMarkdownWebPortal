import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import components
import { AppComponent } from './Components/app.component';


const appRoutes: Routes = [
    { path: 'render/:reportName', component: AppComponent },

];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
