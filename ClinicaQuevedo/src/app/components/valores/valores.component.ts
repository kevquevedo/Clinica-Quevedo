import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-valores',
  templateUrl: './valores.component.html',
  styleUrls: ['./valores.component.css']
})
export class ValoresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    AOS.init({
      once: true
    });
    AOS.refresh();
  }

}
