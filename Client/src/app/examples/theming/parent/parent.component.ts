import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tbs-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  themeSrc: string = require('!raw-loader!./parent.component.scss-theme.scss');

  constructor() {}

  ngOnInit() {}
}
