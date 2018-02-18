import { Component } from '@angular/core';
import { Nav, NavController, NavParams } from 'ionic-angular';
import {Data} from '../../providers/data/data';

@Component({
  selector: 'page-archived',
  templateUrl: 'archived.html',
})
export class ArchivedPage {

  public items = [];

  constructor(public nav: Nav, public navCtrl: NavController, public navParams: NavParams, public dataService: Data) {
    this.dataService.getArchived().then((archived) => {
      
           if(archived){
             this.items = archived;
           }      
    });
  }

  ionViewDidLoad() {
    
  }

  deleteItem(item){
    var array = this.items;
    var index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
    this.dataService.save(this.items);
  }
}
