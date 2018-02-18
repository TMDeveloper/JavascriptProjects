import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { ToDoList } from './app.component';
import { HomePage } from '../pages/home/home';
import { EditNotePage} from '../pages/edit-note/edit-note';
import { AddItemPage} from '../pages/add-item/add-item';
import { ItemDetailPage } from '../pages/item-detail/item-detail';
import { ArchivedPage } from '../pages/archived/archived';
import { Data } from '../providers/data/data';

@NgModule({
  declarations: [
    ToDoList,
    HomePage,
    AddItemPage,
    EditNotePage,
    ItemDetailPage,
    ArchivedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(ToDoList),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ToDoList,
    HomePage,
    AddItemPage,
    EditNotePage,
    ItemDetailPage,
    ArchivedPage
  ],
  providers: [
    StatusBar,
    Data,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
