import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GeneralService } from 'src/services/general.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  user: any;
  userTransfer: string;
  valueTransfer: number;

  constructor(private modalController: ModalController, public alertController: AlertController, private generalService: GeneralService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('cliente'));
    if(this.user.alias_cuenta === 'Mario'){
      this.userTransfer = 'Luigy';
    } else {
      this.userTransfer = 'Mario';
    }
    console.log(this.user._id);

  }

  closeModal(){
    this.modalController.dismiss();
  }

  transfer(){
    if(this.valueTransfer > this.user.moneda){
      this.presentAlertValue();
    }else {
      this.generalService.getClients().subscribe(data => {
        data.list.forEach(element => {
          if(element.alias_cuenta === this.userTransfer){
            this.putTransferUser(element);
          }
        });
      });
    }
  }

  async presentAlertValue() {
    const alert = await this.alertController.create({
      header: 'Saldo insuficiente',
      message: 'Verifique el valor a transferir',
    });
    await alert.present();
  }

  async presentAlertError() {
    const alert = await this.alertController.create({
      header: 'Falla en la Transferencia'
    });
    await alert.present();
  }

  async presentAlertSucces() {
    const alert = await this.alertController.create({
      header: 'Transferencia exitosa',
      message: 'Verifique el usuario a tranferir',
    });
    await alert.present();
  }

  putTransferUser(element: any){
    const transfer: number = Number(this.user.moneda) + Number(this.valueTransfer);
    this.generalService.putTranfer(element._id, transfer).subscribe(data => this.presentAlertSucces(), err => this.presentAlertError());
    this.putTranferless();
  }

  putTranferless(){
    const transfer: number = Number(this.user.moneda) - Number(this.valueTransfer);
    this.generalService.putTranfer(this.user._id, transfer).subscribe(data => this.presentAlertSucces(), err => this.presentAlertError());
    this.user.moneda = transfer;
    localStorage.setItem('cliente', JSON.stringify(this.user));
  }
}
