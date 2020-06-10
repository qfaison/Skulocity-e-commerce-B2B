import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  color;
  logo;

  ngOnInit(): void {
    this.color = localStorage.getItem("fontColor");
    this.logo = localStorage.getItem("logo");
  }

}
