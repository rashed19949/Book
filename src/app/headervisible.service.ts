import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeadervisibleService {
  public isFirstheaderShow: boolean = true;
  public isSecondheaderShow: boolean = false;
  public isFootershow: boolean = true;

  constructor() { }

  setHeaderVisibility(showFirstHeader: boolean, showSecondHeader: boolean) {
    this.isFirstheaderShow = showFirstHeader;
    this.isSecondheaderShow = showSecondHeader;
  }
  footerVisibilty(hideFooter:boolean) {
    this.isFootershow = hideFooter;
  }

}