import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-coberturas',
  templateUrl: './coberturas.component.html',
  styleUrls: ['./coberturas.component.css']
})
export class CoberturasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init({
      once: true
    });
    AOS.refresh();
  }

}
