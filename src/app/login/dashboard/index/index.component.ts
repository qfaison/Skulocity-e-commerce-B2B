import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  color;

  constructor() { }

  ngOnInit(): void {
    this.color = localStorage.getItem("fontColor");
  }

}
