import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TokenService } from './security/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  
  isLogged = false;
  nombreUsuario = "";
  constructor(private tokenService: TokenService) { }
  title = 'Daw';


  ngOnInit() {
    if (this.tokenService.getToken()) {
     
      this.isLogged = true;
      this.nombreUsuario = this.tokenService.getUserNameComplete()|| '{}';
    } else {
      this.isLogged = false;
      this.nombreUsuario = '';
    }
   
  }


}
