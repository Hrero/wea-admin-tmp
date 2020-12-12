import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
const ROOT_ROUTER: Routes = [
    {
        path: '',
        redirectTo: '/content/home/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('../app-login/app-login.module').then(m => m.AppLoginModule)
    },
    {
        path: 'content',
        loadChildren: () => import('../app-content/app-content.module').then(m => m.AppContentModule)
    },
    {
        path: 'pages',
        loadChildren: () => import('../app-pages/app-pages.module').then(m => m.AppPagesModule)
    },
    {
        path: '**',
        redirectTo: '/pages/404'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(ROOT_ROUTER)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
