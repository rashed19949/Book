import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthDashboardComponent } from './auth-dashboard/auth-dashboard.component';
import { UsersModule } from './users/users.module';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  

  {
    path: 'dashboard',
    component: AuthDashboardComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },

      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
        children: UsersModule.routes,
      },
      

    ]

  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
