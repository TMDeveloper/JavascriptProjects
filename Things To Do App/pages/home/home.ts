import { Component } from '@angular/core';
import { MenuController, ToastController, ModalController, NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item';
import { ItemDetailPage } from '../item-detail/item-detail';
import { EditNotePage } from '../edit-note/edit-note';
import {Data} from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public items = [];
  public archivedItems = [];
  public toast: any;

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public modalCtrl: ModalController,  public dataService: Data, menu: MenuController) {
    menu.enable(true);
    this.dataService.getData().then((todos) => {
           if(todos){
             this.items = todos;
           }
    });
    
  }
  
  ionViewDidLoad() {
    
  }

  addItem(){
    let addModal = this.modalCtrl.create(AddItemPage);

       addModal.onDidDismiss((item) => {
    
             if(item){
               this.saveItem(item);
             }
    
       });
       addModal.present();
  }

  editItem(item){
    this.navCtrl.push(EditNotePage, {
      item: item
    });
  }

  deleteItem(item){
    var array = this.items;
    var index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
    this.dataService.save(this.items);
    this.toast = this.toastCtrl.create({
      message: 'Note deleted successfully',
      duration: 3000
    });
    this.toast.present();
  }

  archiveItem(item){
    var array = this.items;
    var index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
    this.dataService.save(this.items);
    this.archivedItems.push(item);
    this.dataService.archive(this.archivedItems);
    this.toast = this.toastCtrl.create({
      message: 'Note saved to archive successfully',
      duration: 3000
    });
    this.toast.present();
  }

  saveItem(item){
    this.items.push(item);
    this.dataService.save(this.items);
  }

  viewItem(item){
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }

}
