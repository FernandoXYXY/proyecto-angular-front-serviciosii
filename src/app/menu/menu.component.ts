import { Component, OnInit } from '@angular/core';
import { TokenService } from '../security/token.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLogged = false;
  isAdmin = false;
  roles: Array<string> = [];

  constructor(private tokenService: TokenService) {
    console.log("MenuComponent >>> constructor >>> " + this.tokenService.getToken());
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(element => {
      if(element == "Administrador"){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
    });
  }

  ngOnInit() {
    console.log("MenuComponent >>> ngOnInit >>> " + this.tokenService.getToken());
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }

  onLogOut(): void {
    this.tokenService.logOut();
    window.location.href = 'http://localhost:4200/login'
  }

}
