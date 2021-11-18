import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from 'src/services/general.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: string;
  pass: number;
  error = false;


  constructor(private router: Router, private generalService: GeneralService) { }

  ngOnInit() {}

  login(){
    this.generalService.getClients().subscribe(data => {
      data.list.forEach(element => {
        if(this.user === element.alias_cuenta) {
          if(this.pass == element.identificacion_cuenta){
            localStorage.setItem('cliente', JSON.stringify(element));
            this.router.navigateByUrl('/home');
          }
        }else{
          this.error = true;
        }
      });
    });
  }

}
