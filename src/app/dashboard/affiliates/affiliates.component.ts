import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-affiliates',
  templateUrl: './affiliates.component.html',
  styleUrls: ['./affiliates.component.scss']
})
export class AffiliatesComponent implements OnInit {

  constructor() { }

  color;
  logo;

  ngOnInit(): void {
    this.color = localStorage.getItem("fontColor");
    this.logo = localStorage.getItem("logo");
  }

}
