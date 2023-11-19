import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss', '../../admin.component.scss']
})
export class UsersListComponent implements OnInit {

  @ViewChild('deleteModal', { static: true }) deleteModal: | ElementRef | undefined;
  componentInView = new Subject();
  usersList: any = [];
  usersListFiltered: any = [];
  searchValue: string = ''
  pageNumbers: any;
  totalPages: any = 0;
  currentPage: any = 1;
  itemsPerPage: any = 2;
  startIndex: any = 1;
  endIndex: any;
  totalReq: any;
  deletedId: any;
  lastVisible: any;
  firstVisible: any;
  constructor(
    private router: Router,
    private user_service: UserService,
    private auth_service: AuthService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUsers()
  }
  onCreate() {
    this.router.navigateByUrl('/auth/signup');
  }

  getUsers(): void {
    this.user_service.getUsers().pipe(takeUntil(this.componentInView)).subscribe((response: any) => {
      this.usersList = response;
      this.usersListFiltered = response
    },
      (error: any) => {
        console.log(error);
      }
    );
  }

  disableUser(id: string): void {
    this.user_service.disableUser(id).pipe(takeUntil(this.componentInView)).subscribe(response => {
      this.getUsers()
      this.toastr.success("User deleted successfully");

    }, error => {
      console.log(error);
    });
  }

  viewBookings(id: any) {
    this.router.navigate(['/admin/dashboard/users/bookings/'], { queryParams: { id } });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages && page != this.currentPage) {
      this.currentPage = page;
      this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.endIndex = this.startIndex + this.itemsPerPage;
      this.getUsers();
    }
  }

  calculatePageNumbers(): void {
    const visiblePages = 5;
    const pageRange = Math.min(visiblePages, this.totalPages);
    let startPage = Math.max(this.currentPage - Math.floor(pageRange / 2), 1);
    let endPage = startPage + pageRange - 1;
    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(endPage - pageRange + 1, 1);
    }

    this.pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    if (startPage > 2) {
      this.pageNumbers.unshift(-1);
    }

    if (endPage < this.totalPages - 1) {
      this.pageNumbers.push(-1);
    }
  }

  openDeleteModal(id: any) {
    this.deletedId = id;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: true,
      keyboard: false,
      centered: true,
      size: 'sm'
    };
    this.modalService.open(this.deleteModal, ngbModalOptions);
  }
  dismissAll() {
    this.modalService.dismissAll();
  }
  searchFilter(value: any) {
    let filterValueLower = this.searchValue.toLowerCase();
    if (this.searchValue === '') {
      this.usersListFiltered = this.usersList;
    }
    else {
      this.usersListFiltered = this.usersList.filter((employee: any) =>
        employee.displayName.includes(filterValueLower)
        || employee.email.includes(filterValueLower)
      )
    }
  }

}
