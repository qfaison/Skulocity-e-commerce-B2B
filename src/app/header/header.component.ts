import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../login/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router : Router,
    private loginService : LoginServiceService
    ) { }

  color;
  logo;
  logoDark: boolean = false;
  fontColor;

  ngOnInit(): void {
    this.color = "#ffffff";
    this.logo = localStorage.getItem("logo");
    this.fontColor = '#000000';
  }

  logout(): void{
    this.loginService.logout().subscribe((res)=>{
      this.router.navigate(['/']);
    });
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
  
  let top = (document.documentElement.scrollTop);
    if(top > 50 )   {
      this.logoDark = true;
      this.color = localStorage.getItem("fontColor");
      this.fontColor = '#ffffff';
    }
    else{
      this.logoDark = false;
      this.color = '#ffffff';
      this.fontColor = '#000000';
    }
  }

}
