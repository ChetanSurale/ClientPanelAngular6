import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean = false;

  constructor(
    public flashMessageService: FlashMessagesService,
    public router: Router,
    public route: ActivatedRoute,
    public clientService: ClientService
  ) { }

  ngOnInit() {
    //get id
    this.id = this.route.snapshot.params['id'];
    //console.log(this.id);
    //get client
    this.clientService.getClient(this.id).valueChanges().subscribe(client => {
      if (client.balance > 0) {
        this.hasBalance = true;
      }
      this.client = client;
      console.log(this.client);
    })
  }

  updateBalance(id: string) {
    this.clientService.updateClient(this.id, this.client);
    this.flashMessageService.show('Balance Updated', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/client/'+this.id]);
  }

  onDeleteClick(){
    if(confirm("Are you sure to delete?")){
      this.clientService.deleteClient(this.id);
      this.flashMessageService.show('Client Deleted', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/']);
    }
  }

}
