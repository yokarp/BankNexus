import { Component } from '@angular/core';
import { GeneralService } from 'src/services/general.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  date: Date = new Date();
  user: any;

  constructor(private generalService: GeneralService, private router: Router, private modalController: ModalController) {
   this.user = JSON.parse(localStorage.getItem('cliente'));
  }

  salir(){
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

  async openModal(){
    const modal = await this.modalController.create({
      swipeToClose: true,
      component: ModalComponent,
      cssClass: 'modal-base'
    });
    return await modal.present();
  }

}
