import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  itemsRef: AngularFireList<Client>;
  items: Observable<Client[]>;
  client: AngularFireObject<Client>;
  constructor(public angularFireDatabase: AngularFireDatabase) {
    this.itemsRef = angularFireDatabase.list('clients');
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getClients() {
    //return this.angularFireDatabase.list<Client>("clients");
    return this.items;
  }

  newClient(client: Client) {
    this.angularFireDatabase.list<Client>("clients").push(client);
  }

  getClient(id: string) {
    this.client = this.angularFireDatabase.object('/clients/' + id);
    return this.client;
  }

  updateClient(id: string, client: Client) {
    return this.angularFireDatabase.list<Client>("clients").update(id, client);
  }

  deleteClient(id:string){
    return this.angularFireDatabase.list<Client>("clients").remove(id);
  }
}
