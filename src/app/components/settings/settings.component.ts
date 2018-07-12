import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from '../../models/Settings';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  settings: Settings;

  constructor(
    public flashMessageService: FlashMessagesService,
    public router: Router,
    public settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit() {
    this.settingsService.changeSettings(this.settings);
    this.flashMessageService.show('Settings Saved Successfully', { cssClass: 'alert-success', timeout: 4000 });
    this.router.navigate(['/settings']);
  }

}
