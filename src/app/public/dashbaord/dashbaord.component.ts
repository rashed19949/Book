import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {

  sidebarStatus:boolean=true;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.userService.isSideBarOpen$.subscribe((data:any)=>{
      if(data === true){
this.sidebarStatus = true
      }else if(data === false){
this.sidebarStatus = false

      }
    })
  }
}
