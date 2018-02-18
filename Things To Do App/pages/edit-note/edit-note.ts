import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import {Data} from '../../providers/data/data';

@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNotePage {
  title: string;
  description: string;
  items = [];
  item = {};
  index;

  constructor(public navCtrl: NavController, public dataService: Data, public navParams: NavParams) {
    this.dataService.getData().then((todos) => {
      if(todos){
        this.items = todos;
      }
    });
  }

  ionViewDidLoad() {
    this.item = this.navParams.get('item');
    this.title = this.navParams.get('item').title;
    this.description = this.navParams.get('item').description;
    this.index = this.items.indexOf(this.item);
  }

  saveItem(){
    this.items[0].title = this.title;
    this.items[0].description = this.description;
    this.dataService.save(this.items);
    this.navCtrl.setRoot(HomePage);
  }

  close(){
    this.navCtrl.pop();
  }
}
