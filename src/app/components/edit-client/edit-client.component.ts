import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client;
  disableBalanceOnEdit: boolean = true;


  constructor(
    public flashMessageService: FlashMessagesService,
    public router: Router,
    public route: ActivatedRoute,
    public clientService: ClientService,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.clientService.getClient(this.id).valueChanges().subscribe(client => {
      this.client = client;
    });
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({ value, valid }: { value: Client, valid: boolean }) {
    if (!valid) {
      // validation flash messages
      this.flashMessageService.show('Please fill all fields', { cssClass: 'alert-danger', timeout: 4000 });
      this.router.navigate(['edit-client/' + this.id]);
    } else {
      this.clientService.updateClient(this.id, value);
      this.flashMessageService.show('Client updated Successfully', { cssClass: 'alert-success', timeout: 4000 });
      this.router.navigate(['/client/' + this.id]);
    }
  }

}
