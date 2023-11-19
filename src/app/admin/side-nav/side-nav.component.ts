import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  sidebarItems: Array<any>;

  constructor(private router: Router) {
    this.sidebarItems = [
      { label: 'Users', route: '/admin/dashboard/users' ,icon:" pi pi-user"},
    ];
  }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/auth/login']).then();
  }

}
