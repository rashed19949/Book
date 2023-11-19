import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  showFortcel = true;
  showAnalogit = false;
  showForm = false;
  showList = true;
  expand = false;
  user: string = ''

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.expand = true;
    let data: any = localStorage.getItem('user')
    if (data) {
      data = JSON.parse(data)
      console.log('data: ', data);
      this.user = data.firstName

    }
  }
  openSidebar() {
    this.expand != this.expand;
    this.userService._isSideBarOpen.next(true)
  }
  closeSidebar() {
    this.userService._isSideBarOpen.next(false)

  }
  // onResize(event:any) {
  //   if (window.innerWidth <= 768) {
  //     this.expand = false;
  //   }
  // }

}
