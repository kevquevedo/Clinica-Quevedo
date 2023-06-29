import { Component, OnInit } from '@angular/core';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-informes',
  templateUrl: './home-informes.component.html',
  styleUrls: ['./home-informes.component.css']
})
export class HomeInformesComponent implements OnInit {

  usuarioLog! : any;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    let auth = getAuth();
    this.usuarioLog = auth.currentUser?.email;
    if(this.usuarioLog == undefined){
      this.router.navigateByUrl('');
    }
  }

}
