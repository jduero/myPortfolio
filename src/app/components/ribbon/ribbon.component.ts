import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ribbon',
  templateUrl: './ribbon.component.html',
  styleUrls: ['./ribbon.component.css']
})
export class RibbonComponent implements OnInit {
  @Input() title! : string;
  constructor() { }

  ngOnInit(): void {
  }

}
