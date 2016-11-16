import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Import components
import { AppComponent } from './Components/app.component';


const appRoutes: Routes = [
    { path: 'main', component: AppComponent },
    { path: 'dashboard', component: AppComponent  },
    { path: 'CV', component: AppComponent  },
    { path: '**', component: AppComponent  },
    { path: '', component: AppComponent  }
    // { path: 'TwitterAuthentication', component: TwitterComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
