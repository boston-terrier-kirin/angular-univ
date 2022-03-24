import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MessagesService } from './messages.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  showMessage = false;
  errors$: Observable<string[]> = new Observable();

  constructor(public messagesService: MessagesService) {
    console.log('MessagesComponent.constructor');
  }

  ngOnInit() {
    this.errors$ = this.messagesService.errors$.pipe(
      tap(() => (this.showMessage = true))
    );
  }

  onClose() {
    this.showMessage = false;
  }
}
